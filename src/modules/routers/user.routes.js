import { Router } from "express"
import { deleteDocumentData, getDocumentData, login, signup, updateDocumentData, verifyAccount } from "../controllers/user.controllers.js";
import { authentication } from "../middlewares/authentication.middleware.js";
import { validate } from "../../middlewares/validator.middleware.js";
import { loginSchema, signupSchema } from "../../validations/user.validations.js";


const userRouter = Router();
userRouter.post("/signup", validate(signupSchema), signup)
userRouter.post("/login", validate(loginSchema), login)
userRouter.get("/verify/:emailToken", verifyAccount)
userRouter.get("/", authentication, getDocumentData)
userRouter.put("/", authentication, updateDocumentData)
userRouter.delete("/", authentication, deleteDocumentData)
export { userRouter }

