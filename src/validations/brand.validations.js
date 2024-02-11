import Joi from "joi";
export const addBrandSchema = Joi.object({
    body: {
        name: Joi.string().min(3).max(200)
    },
    params: {},
    query: {},
    file: {}
})
export const getBrandSchema = Joi.object({
    body: {
    },
    params: {
        brandSlug: Joi.string().required()
    },
    query: {}
})
export const updateBrandSchema = Joi.object({
    body: {
        name: Joi.string().required().min(3).max(200).trim()
    },
    params: {
        brandSlug: Joi.string().required()
    },
    query: {},
    file: {}
})
export const deleteBrandSchema = Joi.object({
    body: {},
    params: {
        brandSlug: Joi.string().required()
    },
    query: {}
})