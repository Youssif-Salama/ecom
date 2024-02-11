import { AppError, catchASyncError } from "../utils/error.handler.js";

export const excute = (status, callback) => {
    return catchASyncError(async (req, res) => {
        const result = await req.dbQuery;
        if (!result) throw new AppError("failed to add document");
        if (callback) {
            await callback(result._id, req.files);
            res.status(status || 200).json({ "message": "success", result });
        }
        else {
            res.status(status || 200).json({ "message": "success", result });
        }
    })
}