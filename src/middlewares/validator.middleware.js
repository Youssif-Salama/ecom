import { AppError } from "../utils/error.handler.js";

export const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(
            {
                body: req.body,
                params: req.params,
                query: req.query,
                ...(req.file && { file: req.file }),
                ...(req.files && { files: req.files })
            },
            { abortEarly: false }
        );
        if (error) {
            throw new AppError(400,
                error.details.map(d => d.message)

            );
        }
        next();
    }
}