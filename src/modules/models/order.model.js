import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    productsIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product"
        }
    ]
}, { timestamps: true })

export const orderModel = mongoose.model("Order", orderSchema)