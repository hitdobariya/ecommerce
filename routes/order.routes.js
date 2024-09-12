const express = require("express");
const orderRoutes = express.Router();
const { createorder, deleteorder, getorder } = require('../controller/order.controller');
const { verifyToken } = require("../helper/tokenVerify");


orderRoutes.post("/addorder", verifyToken, createorder);

orderRoutes.delete("/deleteorder", verifyToken, deleteorder);

orderRoutes.get("/getorder", verifyToken, getorder)


module.exports = orderRoutes;


// createorder, deleteorder, getorder