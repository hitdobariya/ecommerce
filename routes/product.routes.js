const express = require('express');
const { addproduct, getproduct, home, updateproduct, deleteproduct } = require('../controller/product.controller');
const { verifyToken } = require('../helper/tokenVerify');
const { uploadproduct } = require('../helper/uploadimage');
const userRoutes = express.Router();


userRoutes.post("/addproduct", verifyToken, uploadproduct.single('productimage'), addproduct);

userRoutes.get("/product", verifyToken, getproduct );

userRoutes.get("/home", verifyToken, home);

userRoutes.post("/updateproduct", verifyToken, uploadproduct.single('profileimage'), updateproduct);

userRoutes.delete("/deleteproduct", verifyToken, deleteproduct);


module.exports = userRoutes;


// addproduct, product, home, updateproduct, deleteproduct