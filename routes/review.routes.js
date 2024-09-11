const express = require('express');
const reviewRoutes = express.Router();
const { verifyToken } = require("../helper/tokenVerify");

const { createreview, getproductreviews, getuserreviews, updatereview, deletereview } = require('../controller/review.controller');

reviewRoutes.post('/addreview', verifyToken, createreview);

reviewRoutes.get('/productreview', verifyToken, getproductreviews);

reviewRoutes.get('/user-review', verifyToken, getuserreviews);

reviewRoutes.put('/updatereview', verifyToken, updatereview);

reviewRoutes.delete('/deletereview', verifyToken, deletereview);

module.exports = reviewRoutes;


// addreview, productreview, updatereview, deletereview, user-review