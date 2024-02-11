import Joi from "joi";
export const schema = {
    modelId: Joi.string().hex().length(24)
}