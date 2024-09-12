const productservices = require('../services/product.services');
const productservice = new productservices();
const userservices = require('../services/user.services');
const userservice = new userservices();


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