const Product = require('../model/product.model');

class productservices {

    /*add product */
    async add(body) {
        return await Product.create(body)
    };

    /*get all Product */
    async getall(query) {

        // Pagination
        let pageNo = parseInt(query.pageNo) || 1;
        let perPage = parseInt(query.perPage) || 10;
        let skip = (pageNo - 1) * perPage;

        // Sorting
        let sortConditions = {
            price: 1,
            
        };

        if (query.sortBy) {
            sortConditions = {};
            sortConditions[query.sortBy] = query.sortOrder === 'desc' ? 1 : -1;
        }

        // Searching
        let search = query.search ? [
            {
                $match: {
                    $or: [
                        {
                            productname: {
                                $regex: query.search.trim().replace(/\s+/g, " "),
                                $options: "i",
                            }
                        },
                        {
                            description: {
                                $regex: query.search.trim().replace(/\s+/g, " "),
                                $options: "i",
                            }
                        },
                        {
                            price: Number(query.search)
                        },
                    ]
                }
            }
        ] : [];

        let find = [
            {
                $match: { isDelete: false },
            },
            ...search,
            {
                $sort: sortConditions
            }
        ];
        let totalCount = await Product.aggregate([...find]);
        let result = await Product.aggregate([
            ...find,
            {
                $skip: skip,
            },
            {
                $limit: perPage,
            },
        ]);
        let totalPage = Math.ceil(totalCount.length / perPage);
        return {
            totalCount: totalCount.length,
            totalPage,
            currentPage: pageNo,
            result
        };
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
