const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productname: { 
        type: String, 
    },
    productimage: String,
    price: {
        type: Number,
    },
    description: {
        type: [String]
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('products', productSchema);