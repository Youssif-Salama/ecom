import { AppError, catchASyncError } from "../../utils/error.handler.js"
import { iopModel } from "../models/iop.model.js";
import { productModel } from "../models/product.model.js";
import { makeImage } from "../utils/make.image.js";

export const attachCoverImage = () => {
    return catchASyncError(async (req, res, next) => {
        if (!req.files) return next();
        const result = await makeImage(req.files.image[0].path)
        if (!result) throw new AppError("failed to catch cover image", 400);
        req.body.cover_image = result.result._id;
        next();
    })
}
export const attachProductImages = async (productId, files) => {
    if (!files) return;
    const storeForImagesIds = [];
    await Promise.all(files.images.map(async (image) => {
        const result = await makeImage(image.path);
        if (!result) throw new AppError("failed to catch cover image", 400);
        storeForImagesIds.push(result.result._id);
    }));

    if (storeForImagesIds.length > 0) {
        const x = await iopModel.create({ imgId: storeForImagesIds, productId });
    };
}



export const excuteUpdateProduct = (callback) => {
    return catchASyncError(async (req, res) => {
        const slug = req.dbQuery._conditions.slug;
        const product = await productModel.findOne({ slug });
        if (!product) throw new AppError(400, "cannot find product");
        await Promise.all(product.images.map(async(image) => {
            try {
                await iopModel.findByIdAndDelete(image._id);
            }
            catch (error) {
                return error;
            }
        }))
        const productId = product._id;
        if (callback) {
            await callback(productId, req.files);
            const result = await req.dbQuery;
            res.status(200).json({ "message": "success", result });

        }
        else {
            const result = await req.dbQuery;

            res.status(200).json({ "message": "success", result });

        }

    })
}
