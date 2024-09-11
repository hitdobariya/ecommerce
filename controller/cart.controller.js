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
                totalAmount: totalAmount,
                items: {
                    productId: product._id,
                    quantity: parseInt(quantity),
                    price: price,
                    totalAmount: totalAmount
                },
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
        // let cartItem = carts.map((item) => ({
        //     productId: item.productId,
        //     quantity: item.quantity,
        //     price: item.productId.price,
        //     totalAmount: item.quantity * item.productId.price
        // }));
        // let totalPrice = await cartItem.reduce((total, item) => total += item.totalAmount, 0);
        // console.log(cartItem);
        
        res.json({ carts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error...' });
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