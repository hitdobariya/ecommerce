const express = require('express');
const { getproduct, home } = require('../controller/product.controller');
const { verifyToken } = require('../helper/tokenVerify');
const userRoutes = express.Router();


userRoutes.get("/product", verifyToken, getproduct );

userRoutes.get("/home", verifyToken, home);


module.exports = userRoutes;


// product, home