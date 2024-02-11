import { Router } from "express";
import { validate } from "../../middlewares/validator.middleware.js";
import { addReviewSchema, deleteReviewSchema, getReviewSchema, updateReviewSchema } from "../../validations/review.validations.js";
import { authentication } from "../middlewares/authentication.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { addReview, deleteReview, updateReview } from "../controllers/review.controllers.js";
import { paginateQuery, sortQuery } from "../../middlewares/features.middleware.js";
import { attachGet } from "../../middlewares/query.middlewares.js";
import reviewModel from "../models/review.model.js";
import { excute } from "../../handlers/excute.handler.js";




const reviewRouter = Router({ mergeParams: true })

reviewRouter
    .route('/')
    .get(validate(getReviewSchema), paginateQuery(), sortQuery(), attachGet(reviewModel), excute())
    .post(
        authentication,
        authorization("USER"),
        validate(addReviewSchema),
        addReview
    )
    .put(
        authentication,
        authorize("USER"),
        validate(updateReviewSchema),
        updateReview
    )
    .delete(
        authentication,
        authorization("USER"),
        validate(deleteReviewSchema),
        deleteReview
    )


export { reviewRouter }