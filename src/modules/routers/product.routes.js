import { Router } from "express";
import { productModel } from "../models/product.model.js";
import { attachAddOne, attachDelete, attachGet, attachUpdate } from "../../middlewares/query.middlewares.js";
import { excute } from "../../handlers/excute.handler.js";
import { addProductSchema, deleteProductSchema, updateProductSchema } from "../../validations/product.validations.js";
import { filterOne, filterQuery, paginateQuery, populateQuery, searchQuery, selectFieldsQuery, sortQuery } from "../../middlewares/features.middleware.js";
import { validate } from "../../middlewares/validator.middleware.js";
import { upload } from "../../services/multer/multer.js";
import { attachCoverImage, attachProductImages, excuteUpdateProduct } from "../middlewares/product.middleware.js";
import { reviewRouter } from "./review.routes.js";

const productRouter = Router();
productRouter
    .route('/')
    .get(
        attachGet(productModel),
        paginateQuery(3),
        populateQuery("subcategory_id"),
        sortQuery(),
        selectFieldsQuery(),
        searchQuery(),
        excute()
    )
    .post(
        upload.fields([{ name: "image", maxCount: 1 }, { name: "images", maxCount: 5 }]),
        validate(addProductSchema),
        attachCoverImage("cover_image"),
        attachAddOne(productModel),
        excute(201, attachProductImages)
    )
productRouter.get("/all",
    attachGet(productModel),
    excute()
)
productRouter
    .route('/:productSlug')
    .get(
        attachGet(productModel),
        filterOne({ fieldName: 'slug', paramName: 'productSlug' }),
        excute()
    )

    .put(
        upload.fields([{ name: "image", maxCount: 1 }, { name: "images", maxCount: 5 }]),
        validate(updateProductSchema),
        attachCoverImage("cover_image"),
        attachUpdate(productModel),
        filterOne({ fieldName: 'slug', paramName: 'productSlug' }),
        excuteUpdateProduct(attachProductImages)
    )

    .delete(
        validate(deleteProductSchema),
        attachDelete(productModel),
        filterOne({ fieldName: 'slug', paramName: 'productSlug' }),
        excute()
    )

productRouter.use('/:productSlug/review', reviewRouter)

export { productRouter }