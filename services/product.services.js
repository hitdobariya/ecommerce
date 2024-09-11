const Product = require('../model/product.model');

class productservices {

    /*add product */
    async add(body) {
        return await Product.create(body)
    };

    /*get all Product */
    async getall() {
        return await Product.find()
    };

    /*get single Product */
    async isproduct(body) {
        return await Product.findOne(body)
    };

    /*update Product */
    async editproduct(productId, updateData) {
        return await Product.findByIdAndUpdate(productId, updateData, { new: true });
    }

    /*soft delete Product */
    async deleteproduct(productId) {
        return await Product.findByIdAndUpdate(productId, { $set: { isDelete: true } }, { new: true });
    }

}

module.exports = productservices;
