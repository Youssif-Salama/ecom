import mongoose from 'mongoose'
import slugify from 'slugify'

const subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minLength: 3,
            maxLength: 200,
            required: true,
            trim: true,
            unique: true,
        },
        slug: {
            type: String,
            minLength: 3,
            maxLength: 200,
            trim: true,
            unique: true,
        },
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
    },
    { timestamps: true }
)

subCategorySchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()
})

subCategorySchema.pre('updateMany', function (next) {
    if (this._update.name)
        this._update.slug = slugify(this._update.name, { lower: true })
    next()
})

const subCategoryModel = mongoose.model('Subcategory', subCategorySchema)

export { subCategoryModel }
