import mongoose from "mongoose";

const iopSchema = new mongoose.Schema({
    imgId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Image"
        }
    ],
    productId:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    }
}, { timestamps: true })

iopSchema.pre(/find/, async function (next) {
    try {
        this.populate("imgId")
    } catch (error) {
        next(error);
    }
});


iopSchema.pre(/delete/i, async function (next) {
    const toBeDeletedDoc = await iopModel.findOne(this._conditions)
    if (!toBeDeletedDoc) return next();
    await Promise.all(toBeDeletedDoc.imgId.map(async (img) => {
        await mongoose.model("Image").findByIdAndDelete(img);
    }))
})
const iopModel = mongoose.model("Iop", iopSchema)

export { iopModel }