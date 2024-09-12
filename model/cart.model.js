const mongoose = require('mongoose');
const { isReadable } = require('nodemailer/lib/xoauth2');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    quantity: {
        type: Number,
        min: 1,
        max: 20,
        default: 1
    },
    totalAmount: {
        type: Number
    },
    totalPrice: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('carts', cartSchema);