import Joi from 'joi'

export const addSubcategorySchema = Joi.object({
    body: {
        name: Joi.string().min(3).max(200).trim().required(),
    },
    params: { categorySlug: Joi.string().required() },
    query: {},
})

export const updateSubcategorySchema = Joi.object({
    body: {
        name: Joi.string().min(3).max(200).trim(),
    },
    params: {
        subCategorySlug: Joi.string().required(),
        categorySlug: Joi.string().required(),
    },
    query: {},
})

export const deleteSubcategorySchema = Joi.object({
    body: {},
    params: {
        subCategorySlug: Joi.string().required(),
        categorySlug: Joi.string().required(),
    },
    query: {},
})
