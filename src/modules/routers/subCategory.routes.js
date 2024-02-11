import { Router } from "express";
import { validate } from "../../middlewares/validator.middleware.js";
import { attachAddOne, attachDelete, attachGet, attachUpdate } from "../../middlewares/query.middlewares.js";
import { filterOne, populateQuery } from "../../middlewares/features.middleware.js";
import { excute } from "../../handlers/excute.handler.js";

import { subCategoryModel } from "../models/subCategory.model.js"
import { attachCategoryId, filterSubcategories } from "../middlewares/subCategory.middlewares.js";
import { addSubcategorySchema, deleteSubcategorySchema, updateSubcategorySchema } from "../../validations/subCategory.validations.js"
const subCategoryRouter = Router({ mergeParams: true });

// add one and get all and delete all
subCategoryRouter.route("/")
    .post(validate(addSubcategorySchema),
        attachCategoryId(),
        attachAddOne(subCategoryModel),
        excute())

    .get(attachGet(subCategoryModel),
        populateQuery("category_id"),
        attachCategoryId(),
        filterSubcategories(),
        excute())

    .delete(attachDelete(subCategoryModel), excute)

subCategoryRouter.get("/all", attachGet(subCategoryModel), populateQuery("category_id"), excute)


//  get specific category and update and delete
subCategoryRouter.route("/:subCategorySlug")
    .get(attachGet(subCategoryModel),
        filterOne({ fieldName: "slug", paramName: "subCategorySlug" }),
        attachCategoryId(),
        filterSubcategories(),
        excute())

    .put(validate(updateSubcategorySchema),
        attachUpdate(subCategoryModel),
        filterOne({ fieldName: "slug", paramName: "subCategorySlug" }),
        attachCategoryId(),
        filterSubcategories(),
        excute())

    .delete(validate(deleteSubcategorySchema),
        attachDelete(subCategoryModel),
        filterOne({ fieldName: "slug", paramName: "subCategorySlug" }),
        attachCategoryId(),
        filterSubcategories(),
        excute())



export { subCategoryRouter }