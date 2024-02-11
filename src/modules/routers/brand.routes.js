import { Router } from "express";
import { validate } from "../../middlewares/validator.middleware.js";

import { upload } from "../../services/multer/multer.js";
import { attachImage } from "../middlewares/image.middleware.js";
import { addBrand, deleteBrand, getBrand, updateBrand } from "../controllers/brand.controllers.js";
import { brandModel } from "../models/brand.model.js";
import { addBrandSchema, deleteBrandSchema, getBrandSchema, updateBrandSchema } from "../../validations/brand.validations.js";
import { attachGet } from "../../middlewares/query.middlewares.js";
import { paginateQuery, searchQuery } from "../../middlewares/features.middleware.js";
import { excute } from "../../handlers/excute.handler.js";


const brandRouter = Router();

// add one and get all and delete all
brandRouter.route("/")
    .post(
        validate(addBrandSchema),
        upload.single("logo"),
        attachImage("logo"),
        addBrand)

    .get(attachGet(brandModel),
        paginateQuery(3),
        searchQuery(),
        excute())

//  get specific brand and update and delete
brandRouter.route("/:brandSlug")
    .get(validate(getBrandSchema), getBrand)

    .put(upload.single("logo"),
        validate(updateBrandSchema),
        attachImage("logo"),
        updateBrand)

    .delete(validate(deleteBrandSchema), deleteBrand)


export { brandRouter };