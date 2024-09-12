const express = require("express");
const cartRoutes = express.Router();
const { addtocart, getcarts, deletecart, incrementquantity, decrementquantity } = require('../controller/cart.controller');
const { verifyToken } = require("../helper/tokenVerify");


cartRoutes.post('/addtocart', verifyToken, addtocart);

cartRoutes.get('/getcarts', verifyToken, getcarts);

cartRoutes.put('/incquantity', verifyToken, incrementquantity);

cartRoutes.put('/decquantity', verifyToken, decrementquantity);

cartRoutes.delete('/deletecart', verifyToken, deletecart);


module.exports = cartRoutes;


// addtocart, getcarts, deletecart, incquantity, decquantity