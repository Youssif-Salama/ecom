import slugify from "slugify";
import mongoose from "mongoose";
const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200,
        trim: true,
        unique: true
    },
    slug: {
        type: String,
        unique: true
    },
    logo: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Image"
    }
}, { timestamps: true })
brandSchema.pre("save", async function (next) {
    try {
        this.slug = await slugify(this.name);
        next();
    } catch (error) {
        next(error);
    }
});

brandSchema.pre(/find/, async function (next) {
    try {
        this.populate("logo")
    } catch (error) {
        next(error);
    }
});

brandSchema.pre(/update/i, function (next) {
    if (this._update.name) {
        this._update.slug = slugify(this._update.name, { lower: true })
        next()
    }
    else next();
})


brandSchema.pre(/delete/i, async function (next) {
    const toBeDeletedDoc = await categoryModel.findOne(this._conditions);
    if (!toBeDeletedDoc) return next();
    await mongoose.model("Image").findByIdAndDelete(toBeDeletedDoc.logo);
    next();
})
const brandModel = mongoose.model("Brand", brandSchema);

export { brandModel }