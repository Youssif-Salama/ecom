import mongoose from "mongoose";
import { cloudinaryDeleter } from "../../services/cloudinary/cloudinary.js";

const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    path: {
        type: String,
        required: true,
        unique: true,
    }
})

imageSchema.pre(/delete/i, async function (next) {
    const toBeDeletedImg = await imageModel.findOne(this._conditions);
    await cloudinaryDeleter(toBeDeletedImg.name);
    next();
})

const imageModel = mongoose.model("Image", imageSchema);

export { imageModel }