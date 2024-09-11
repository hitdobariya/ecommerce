const mongoose = require('mongoose');

const userSchema  = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    profileimage: String,
    otp:String,
    otpExpiry: { 
        type: Date 
    },
    // shippigaddress: {
    //      type: mongoose.Schema.Types.ObjectId,
    //     ref: 'address'
    // },
    // paymentmethod: {
    //      type: mongoose.Schema.Types.ObjectId,
    //     ref: 'payment'
    // }
    isDelete:{
        type: Boolean,
        default: false
    }
},{
    versionKey: false
});


module.exports = mongoose.model("users", userSchema);