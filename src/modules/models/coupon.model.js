import mongoose from "mongoose";
const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Coupon code must be at least 5 characters'],
        maxlength: [8, 'Coupon code cannot exceed 8 characters'],
        // Add a regular expression validation if needed
    },
    discount: {
        type: Number,
        required: true,
        unique: true,
        min: [5, 'Discount must be at least 5%'],
        max: [80, 'Discount cannot exceed 80%'],
    },
    limits: {
        type: Number,
        required: true,
        unique: true,
        max: [2, 'Usage limit cannot exceed 2'],
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    expireDate: {
        type: Date,
        validate: {
            validator: function () {
                return this.expireDate < new Date() ? this.isActive = false : true;
            },
            message: 'Coupon expiration date must be in the future',
        },
    },
}, { timestamps: true });

export const couponModel = mongoose.model("Coupon", couponSchema);