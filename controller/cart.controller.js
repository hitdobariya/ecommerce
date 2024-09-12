const Cart = require("../model/cart.model");
const Product = require("../model/product.model");

exports.addtocart = async (req, res) => {

    try {
        const { product_id, quantity } = req.query;
        const user = req.user._id;
        let product = await Product.findOne({ _id: product_id, isDelete: false });
        if (!product) { return res.status(404).json({ message: 'Product not found...' }); }
        const price = product.price;
        const totalAmount = quantity * price;
        let cart = await Cart.findOne({ userId: user, productId: product_id, isDelete: false });
        if (cart) {
            cart.quantity += parseInt(quantity);
            cart.totalAmount = cart.quantity * price;
            await cart.save();
        } else {
            cart = await Cart.create({
                userId: user,
                productId: product_id,
                quantity: parseInt(quantity),
                totalAmount: totalAmount
            });
        }

        res.json({ message: 'Cart added SuccessFull...', cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error...' });
    }

};


exports.getcarts = async (req, res) => {

    try {
        let carts = await Cart.find({ userId: req.user._id, isDelete: false }).populate('productId', 'productname');
        if (!carts) return res.status(404).json({ message: 'Cart not found...' });
        res.json({ carts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error...' });
    }

};


exports.incrementquantity = async (req, res) => {

    try {
        let cart = await Cart.findOne({ userId: req.user._id, _id: req.query.cartId, isDelete: false });
        if (!cart) return res.status(404).json({ message: 'cart not found...' });
        let product = await Product.findById(cart.productId);
        if (!product) { return res.status(404).json({ message: 'Product not found...' }); }
        const price = product.price;
        cart.quantity++;
        cart.totalAmount = cart.quantity * price;
        await cart.save();
        res.json({ message: 'Cart quantity incremented...', cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error...' });
    }

};


exports.decrementquantity = async (req, res) => {

    try {
        let cart = await Cart.findOne({ userId: req.user._id, _id: req.query.cartId, isDelete: false });
        if (!cart) return res.status(404).json({ message: 'cart not found...' });
        let product = await Product.findById(cart.productId);
        if (!product) { return res.status(404).json({ message: 'Product not found...' }); }
        const price = product.price;
        cart.quantity--;
        cart.totalAmount = cart.quantity * price;
        await cart.save();
        res.json({ message: 'Cart quantity decremented...', cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error...' });
    }

};


exports.deletecart = async (req, res) => {

    try {
        let cart = await Cart.find({ userId: req.user._id, isDelete: false });
        if (!cart) return res.status(404).json({ message: 'cart not found...' });
        cart = await Cart.updateOne({ _id: req.query.cartId }, { $set: { isDelete: true } }, { new: true });
        // console.log(cart);
        res.status(200).json({ message: 'cart deleted...', cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error...' });
    }

};