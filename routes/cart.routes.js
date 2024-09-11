const express = require("express");
const cartRoutes = express.Router();
const { addtocart, getcarts, deletecart } = require('../controller/cart.controller');
const { verifyToken } = require("../helper/tokenVerify");

cartRoutes.post('/addtocart', verifyToken, addtocart);
cartRoutes.get('/getcarts', verifyToken, getcarts);
cartRoutes.delete('/deletecart', verifyToken, deletecart);

module.exports = cartRoutes;