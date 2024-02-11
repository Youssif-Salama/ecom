import { Router } from "express";
import { attachAddOne, attachDelete, attachGet, attachUpdate } from "../../middlewares/query.middlewares.js";
import { excute } from "../../handlers/excute.handler.js";
import { validate } from "../../middlewares/validator.middleware.js";
import { addOneCategoryValidationSchema, deleteCategoryValidationSchema, updateCategoryValidationSchema } from "../../validations/category.validations.js";
import { filterOne } from "../../middlewares/features.middleware.js";
import { categoryModel } from "../models/category.model.js";
import { subCategoryRouter } from "./subCategory.routes.js";
import { upload } from "../../services/multer/multer.js";
import { attachImage } from "../middlewares/image.middleware.js";


const categoryRouter = Router();

// add one and get all and delete all
categoryRouter.route("/")
    .post(validate(addOneCategoryValidationSchema),
        upload.single("image"),
        attachImage("image"),
        attachAddOne(categoryModel),
        excute())

    .get(attachGet(categoryModel), excute())
    .delete(attachDelete(categoryModel), excute())

//  get specific category and update and delete
categoryRouter.route("/:categorySlug")
    .get(attachGet(categoryModel), filterOne({ fieldName: "slug", paramName: "categorySlug" }), excute())
    .put(validate(updateCategoryValidationSchema), upload.single("image"), attachImage("image"), attachUpdate(categoryModel), filterOne({ fieldName: "slug", paramName: "categorySlug" }), excute())
    .delete(validate(deleteCategoryValidationSchema), attachDelete(categoryModel), filterOne({ fieldName: "slug", paramName: "categorySlug" }), excute())


categoryRouter.use("/:categorySlug/subCategories", subCategoryRouter)
export { categoryRouter };