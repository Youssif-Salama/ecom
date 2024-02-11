import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN", "SELLER"],
        default: "USER"
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    phone: {
        type: String,
        trim: true,
        required: true,
        match: /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/
    },
    address: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    },
    loggedIn: {
        type: Boolean,
        default: false
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    DateOB: {
        type: Date,
        match: /^([0-9]{4})(\/|-)(1[0-2]|0?[1-9])\2(3[01]|[12][0-9]|0?[1-9])$/
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    ordersIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }],
    reviewsIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    imageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
    }
},
    { timestamps: true })

export const userModel = mongoose.model("User", userSchema);


