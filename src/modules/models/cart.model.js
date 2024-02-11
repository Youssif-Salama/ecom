import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
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
},{ timestamps: true })

export const cartModel = mongoose.model("Cart", cartSchema)