const productservices = require('../services/product.services');
const productservice = new productservices();
const userservices = require('../services/user.services');
const userservice = new userservices();

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


exports.home = async (req, res) => {

    try {
        let product = await productservice.getall();
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error...' });
    }

};


exports.getproduct = async (req, res) => {
    try {
        let product = await productservice.isproduct({ _id: req.body.id });
        if (!product) return res.status(404).json({ message: 'product not found...' });
        // res.render('product.ejs');
        res.status(200).json(product);
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