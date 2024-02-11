import { cloudinaryUploader } from "../../services/cloudinary/cloudinary.js";
import { AppError, catchASyncError } from "../../utils/error.handler.js"
import { makeImage } from "../utils/make.image.js";

export const attachImage = (imageFieldName) => {
    return catchASyncError(async (req, res, next) => {
        /*
       1-use multer to make req.file
       2-destructing path from req.file
       3-upload on cloudinary
       4-modify in imageModel and req.body
   */
        if (!req.file) return next();
        const { result } = await makeImage(req.file.path)
        if (!result) throw new AppError("filed to save image details");
        req.body[imageFieldName] = result._id;
        next();
    })
}