const User = require('../model/user.model');

class userservices {

    /*register user */
    async register(body) {
        return await User.create(body)
    };

    /*get all user */
    async getuser(body) {
        return await User.find(body)
    };

    /*get single user */
    async isuser(body) {
        return await User.findOne(body)
    };

    /*update user */
    async edituser(userId, updateData) {
        return await User.findByIdAndUpdate(userId, updateData, { new: true });
    }

    /*soft delete user */
    async deleteuser(userId) {
        return await User.findByIdAndUpdate(userId, { $set: { isDelete: true } }, { new: true });
    }

}

module.exports = userservices;
