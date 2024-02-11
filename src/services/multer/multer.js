import multer from "multer";
import { AppError } from "../../utils/error.handler.js";

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith("image")) {
        // If the file is not an image, pass an error to the callback
        return cb(new AppError("Only images are allowed"), false);
    }
    
    // If the file is an image, pass null (no error) and true (file is accepted) to the callback
    cb(null, true);
};

export const upload = multer({ storage, fileFilter });
