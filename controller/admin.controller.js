const userservices = require('../services/user.services');
const userservice = new userservices();
const productservices = require('../services/product.services');
const productservice = new productservices();
const Review = require('../model/review.model');
const Address = require('../model/address.model');
const Cart = require("../model/cart.model");
const Order = require("../model/order.model");


exports.getalluser = async (req, res) => {

    try {
        let admin = await userservice.isuser({ _id: req.user._id, role: 'admin' });
        if (!admin) { return res.json(400).json({ message: 'only admin can see users...' }); }
        let users = await userservice.getuser();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error...' });
    }

}

exports.deleteuser = async (req, res) => {

    try {
        let admin = await userservice.isuser({ _id: req.user._id, role: 'admin' });
        if (!admin) { return res.json(400).json({ message: 'Only admin can delete products...' }); }
        const userId = req.query.id;
        const user = await userservice.isuser({ _id: userId });
        if (!user) { return res.status(404).json({ message: 'User not found...' }); }
        await userservice.deleteuser(userId);
        // res.redirect('/api/user/login').clearCookie('token');
        res.status(200).json({ message: 'User deleted successfully...' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error...' });
    }

};


exports.addproduct = async (req, res) => {

    try {
        let imagepath = "";
        let admin = await userservice.isuser({ _id: req.user._id, role: 'admin' });
        if (!admin) return res.json(400, { message: 'only admin can add product...' });
        let product = await productservice.isproduct({ _id: req.body.id });
        if (product) res.status(500).json({ product, message: 'product already exists...' });
        if (req.file) { imagepath = req.file.path.replace(/\\/g, '/'); };
        product = await productservice.add({ ...req.body, productimage: imagepath });
        res.status(201).json({ message: 'product add successfully...' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error...' });
    }

};

exports.updateproduct = async (req, res) => {

    try {
        const productid = req.body.id;
        const updateData = req.body;
        let admin = await userservice.isuser({ _id: req.user._id, role: 'admin' });
        if (!admin) return res.json(400, { message: 'only admin can update product...' });
        let product = await productservice.isproduct({ _id: req.body.id });
        if (!product) return res.status(404).json({ message: 'product not found...' });
        product = await productservice.editproduct(productid, updateData);
        res.status(200).json({ product, message: 'product update successfully...', product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error...' });
    }

};

exports.deleteproduct = async (req, res) => {
    try {
        const isAdmin = await userservice.isuser({ _id: req.user._id, role: 'admin' });
        if (!isAdmin) { return res.status(400).json({ message: 'Only admin can delete products...' }); }
        const productId = req.query.id;
        if (!productId) { return res.status(400).json({ message: 'Product ID is required...' }); }
        const product = await productservice.isproduct({ _id: productId });
        if (!product) { return res.status(404).json({ message: 'Product not found.' }); }
        await productservice.deleteproduct(productId);
        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


exports.getalluseraddress = async (req, res) => {

    try {
        let admin = await userservice.isuser({ _id: req.user._id, role: 'admin' });
        if (!admin) { return res.json(400).json({ message: 'only admin can see users...' }); }
        let address = await Address.find().populate('userId', 'name');
        if(!address) return res.status(404).json({ message: 'Address not found...' });
        res.status(200).json(address);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error...' });
    }

}


exports.getallreviews = async (req, res) => {

    try {
        let admin = await userservice.isuser({ _id: req.user._id, role: 'admin' });
        if (!admin) { return res.json(400).json({ message: 'only admin can see users...' }); }
        let review = await Review.find().populate('userId', 'name');
        if(!review) return res.status(404).json({ message: 'Review not found...' });
        res.status(200).json(review);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error...' });
    }

}


exports.getallcarts = async (req, res) => {

    try {
        let admin = await userservice.isuser({ _id: req.user._id, role: 'admin' });
        if (!admin) { return res.json(400).json({ message: 'only admin can see users...' }); }
        let cart = await Cart.find().populate('userId', 'name');
        if(!cart) return res.status(404).json({ message: 'Cart not found...' });
        res.status(200).json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error...' });
    }

}

exports.getallorders = async (req, res) => {

    try {
        let admin = await userservice.isuser({ _id: req.user._id, role: 'admin' });
        if (!admin) { return res.json(400).json({ message: 'only admin can see users...' }); }
        let order = await Order.find().populate('userId', 'name');
        if(!order) return res.status(404).json({ message: 'Order not found...' });
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error...' });
    }

}