import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
    }],
    payment: {},
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipping", "Delivered", "Cancelled"], // Fixed typo in "delivered" and "cancelled"
    }
}, { timestamps: true }); // Fixed typo in "timestamps"

export default mongoose.model("Order", orderSchema); // Changed model name to singular "Order"
