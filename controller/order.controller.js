const Order = require("../model/order.model");
const Cart = require("../model/cart.model");


exports.createorder = async (req, res) => {

    try {
        let cart = await Cart.find({ userId: req.user._id, isDelete: false }).populate('userId', 'name');
        if (cart.length < 1) return res.status(404).json({ message: 'cart not found...' });
        console.log(cart);
        let orderItem = cart.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price,
            totalAmount: item.totalAmount
        }));
        // console.log(orderItem);
        let amount = orderItem.reduce((total, item) => (total += item.totalAmount), 0);
        console.log(amount);

        let order = await Order.create({
            userId: req.user._id,
            items: orderItem,
            totalPrice: amount
        });
        await Cart.updateMany({ userId: req.user._id, isDelete: false }, { isDelete: true });
        res.json({ message: 'order placed...', order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error...' });
    }

};


exports.getorder = async (req, res) => {

    try {
        let order = await Order.find({ userId: req.user._id }).populate('userId', 'name');
        if (order.length < 1) return res.status(404).json({ message: 'order not found...' });
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error...' });
    }

}


exports.deleteorder = async (req, res) => {

    try {
        let order = await Order.findOne({_id:req.query.orderId , isDelete: false});
        if (!order) return re.json({ message: 'order not found...' });
        console.log(order);
        if (!order) return res.status(404).json({ message: 'order not found...' });
        order.isDelete = true;
        await order.save();
        // res.redirect('/api/product/home').json({message: 'order deleted...'});
        res.status(200).json({ message: 'order deleted...', order });
    } catch (error) {
        // return res.redirect("/api/order/getorder").json({message: 'order'});
        console.log(error);
        res.status(500).json({ message: 'internal server error...' });
    }

};