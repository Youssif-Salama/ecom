import mongoose from "mongoose";
import slugify from "slugify";
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        unique: true
    },
    slug: {
        type: String,
        unique: true
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
        required: true
    }
}, { timestamps: true })

categorySchema.pre("save", async function (next) {
    try {
        this.slug = await slugify(this.name);
        next();
    } catch (error) {
        next(error);
    }
});

categorySchema.pre(/find/, async function (next) {
    try {
        this.populate("image")
    } catch (error) {
        next(error);
    }
});

categorySchema.pre('updateMany', function (next) {
    if (this._update.name)
        this._update.slug = slugify(this._update.name, { lower: true })
    next()
})


categorySchema.pre(/delete/i, async function (next) {
    const toBeDeletedDoc = await categoryModel.findOne(this._conditions);
    if (!toBeDeletedDoc) return next();
    await mongoose.model("Image").findByIdAndDelete(toBeDeletedDoc.image);
    next();
})
const categoryModel = mongoose.model("Category", categorySchema);

export { categoryModel }