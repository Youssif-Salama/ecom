import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

import { AppError, catchASyncError } from "../../utils/error.handler.js";

export const authentication = catchASyncError(async (req, res, next) => {
    const userToken = req.header("userToken");
    if (!userToken) throw new AppError("unauthorized", 400);
    jwt.verify(userToken, process.env.TOKEN_KEY, (error, decodedToken) => {
        if (error) throw new AppError("invalid token", 498);
        req.decodedToken = decodedToken;
        next();
    })
})