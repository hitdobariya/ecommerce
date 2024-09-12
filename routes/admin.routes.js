const express = require('express');
const adminRoutes = express.Router();
const { verifyToken } = require("../helper/tokenVerify");
const { uploadproduct } = require('../helper/uploadimage');
const { getalluser, deleteuser, addproduct, updateproduct, deleteproduct, getallreviews, getallcarts, getallorders, getalluseraddress } = require('../controller/admin.controller');


adminRoutes.get("/allusers", verifyToken, getalluser);

adminRoutes.delete("/deleteuser", verifyToken, deleteuser);


adminRoutes.post("/addproduct", verifyToken, uploadproduct.single('productimage'), addproduct);

adminRoutes.post("/updateproduct", verifyToken, uploadproduct.single('profileimage'), updateproduct);

adminRoutes.delete("/deleteproduct", verifyToken, deleteproduct);


adminRoutes.get('/getalladdresses', verifyToken, getalluseraddress);


adminRoutes.get('/getallreviews', verifyToken, getallreviews);


adminRoutes.get('/getcarts', verifyToken, getallcarts);


adminRoutes.get('/getallorders', verifyToken, getallorders);


module.exports = adminRoutes;


// allusers, deleteuser, addproduct, updateproduct, deleteproduct, getalladdresses, getallreviews, getallcarts, getallorders, getalluseraddress