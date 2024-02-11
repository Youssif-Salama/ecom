import mongoose from 'mongoose'
import slugify from 'slugify'

const productSchema = new mongoose.Schema(
	{
		title: {
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
		description: {
			type: String,
			minLength: 3,
			maxLength: 10000,
			required: true,
			trim: true,
		},
		stock: {
			type: Number,
			min: 0,
			required: true,
		},
		price: {
			type: Number,
			min: 0.01,
			required: true,
		},
		discounted_price: {
			type: Number,
			min: 0.01,
			required: true,
			validate: {
				validator: function (value) {
					return value <= this.price
				},
				message:
					'The discounted price must not exceed the initial price',
			},
		},
		cover_image: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Image',
		},
		features: [
			{
				key: String,
				value: String,
			},
		],
		subcategory_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Subcategory',
			required: true,
		},
	},
	{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

productSchema.pre('save', function (next) {
	this.slug = slugify(this.title, { lower: true })
	next()
})

productSchema.pre('updateMany', function (next) {
	if (this._update.title)
		this._update.slug = slugify(this._update.title, { lower: true })
	next()
})


productSchema.pre(/find/, async function (next) {
	try {
		this.populate("cover_image")
	} catch (error) {
		next(error);
	}
});

productSchema.virtual("images", {
	ref: "Iop",
	localField: "_id",
	foreignField: "productId"
})

productSchema.pre(/find/, async function (next) {
	try {
		this.populate("images")
	} catch (error) {
		next(error);
	}
});


productSchema.pre(/delete/i, async function (next) {
	const toBeDeletedDoc = await productModel.findOne(this._conditions);
	if (!toBeDeletedDoc) return next();
	await mongoose.model("Image").findByIdAndDelete(toBeDeletedDoc.cover_image);
	next();
})

productSchema.pre(/delete/i, async function (next) {
	const toBeDeletedDoc = await productModel.findOne(this._conditions);
	if (!toBeDeletedDoc) return next();
	await Promise.all(toBeDeletedDoc.images.map(async (image) => {
		await mongoose.model("Iop").findByIdAndDelete(image._id)
	}))
})
const productModel = mongoose.model('Product', productSchema)




export { productModel }
