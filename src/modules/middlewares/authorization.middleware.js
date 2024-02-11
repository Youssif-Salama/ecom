import { AppError, catchASyncError } from "../../utils/error.handler.js";

export const authorization = (actorRole) => {
    return catchASyncError((req, res, next) => {
        const { role } = req.decodedToken;
        if (role === actorRole) next();
        throw new AppError("forbidden", 403)
    })
}