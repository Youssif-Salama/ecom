import { Router } from "express";
import { categoryRouter } from "../modules/routers/category.routes.js";
import { subCategoryRouter } from "../modules/routers/subCategory.routes.js";
import { productRouter } from "../modules/routers/product.routes.js";
import { userRouter } from "../modules/routers/user.routes.js";
import { brandRouter } from "../modules/routers/brand.routes.js";
import { reviewRouter } from "../modules/routers/review.routes.js";


const v1Router = Router();

v1Router.use("/categories", categoryRouter)
v1Router.use("/subCategories", subCategoryRouter)
v1Router.use("/products", productRouter)
v1Router.use("/user", userRouter)
v1Router.use("/brand", brandRouter)
v1Router.use("/review", reviewRouter)
export { v1Router }