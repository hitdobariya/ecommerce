const mongoose = require('mongoose');
const { isReadable } = require('nodemailer/lib/xoauth2');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
    },
    items: [
        {
            quantity: {
                type: Number,
                min: 1,
                max: 10,
                default: 1
            },
            price: {
                type: Number,
            },
            totalAmount: {
                type: Number,
                default: 0
            },
        }
    ],
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
