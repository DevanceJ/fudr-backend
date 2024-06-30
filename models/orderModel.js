const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
    },
    tableNumber: {
        type: Number,
        required: [true, "Please provide a table number"],
    },
    totalAmount: {
        type: Number,
        required: [true, "Please provide a total amount"],
    },
    orderItems: [
        {
            name: {
                type: String,
                required: [true, "Please provide a name"],
            },
            quantity: {
                type: Number,
                required: [true, "Please provide a quantity"],
            },
            price: {
                type: Number,
                required: [true, "Please provide a price"],
            },
        }
    ],
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Order', orderSchema);