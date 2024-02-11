import Joi from "joi";

export const addOneCategoryValidationSchema = Joi.object({
    body: {
        name: Joi.string().min(3).max(50),
    },
    params: {},
    query: {},
    file:{
        
    }
})

export const updateCategoryValidationSchema = Joi.object({
    body: {
        name: Joi.string().min(3).max(200),
    },
    params: { categorySlug: Joi.string().required() },
    query: {},
})

export const deleteCategoryValidationSchema = Joi.object({
    body: {},
    params: { categorySlug: Joi.string().required() },
    query: {},
})