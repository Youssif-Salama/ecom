import { cloudinaryUploader } from "../../services/cloudinary/cloudinary.js";
import { imageModel } from "../models/image.model.js";

export const makeImage = async (path) => {
    const { imageName, imageUrl } = await cloudinaryUploader(path);
    console.log(imageName,imageUrl)
    const result = await imageModel.create({ name: imageName, path: imageUrl })
    return { result }
}