const express = require('express');
const addressRoutes = express.Router();
// const { verifyToken } = require('../helper/tokenverify');
const { verifyToken } = require("../helper/tokenVerify");
const { createaddress, getuseraddresses, updateaddress, deleteaddress, setdefaultaddress, getalluseraddress } = require('../controller/address.controller');

addressRoutes.post('/addaddress', verifyToken, createaddress );

addressRoutes.get('/getaddresses', verifyToken, getuseraddresses);

addressRoutes.get('/getalladdresses', verifyToken, getalluseraddress);

addressRoutes.put('/editaddress', verifyToken, updateaddress);

addressRoutes.delete('/deleteaddress', verifyToken, deleteaddress);

addressRoutes.patch('/setdefaultaddress', verifyToken, setdefaultaddress);

module.exports = addressRoutes;


//  addaddress, editaddress, deleteaddress, setdefaultaddress, getalladdress, getaddress