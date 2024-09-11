const express = require('express');
const { showsignup, signup, showlogin, loginuser, logout, userprofile, editprofile, showedit, getalluser, deleteuser, showemail, sendemail, showotp, sendotp, showsetnewpassword, setnewpassword } = require('../controller/user.controller');
const { verifyToken } = require('../helper/tokenVerify');
const { uploadprofile } = require('../helper/uploadimage');
const sendOTP = require('../helper/otpverify');
const userRoutes = express.Router();


userRoutes.get("/signup", uploadprofile.single('profileimage'), showsignup); 
userRoutes.post("/signup", uploadprofile.single('profileimage'), signup);

userRoutes.get("/login", showlogin);
userRoutes.post("/login", loginuser);

userRoutes.get("/getuser", verifyToken, userprofile);

userRoutes.get("/edituser", verifyToken, uploadprofile.single('profileimage'), showedit);
userRoutes.post("/edituser", verifyToken, uploadprofile.single('profileimage'), editprofile);

userRoutes.get('/forgotpassword/email', sendOTP, showemail);
userRoutes.post('/forgotpassword/email', sendOTP, sendemail);

userRoutes.get('/forgotpassword/otpverify', sendOTP, showotp);
userRoutes.post('/forgotpassword/otpverify', sendOTP, sendotp);

userRoutes.get('/forgotpassword/setnewpassword', sendOTP, showsetnewpassword);
userRoutes.post('/forgotpassword/setnewpassword', sendOTP, setnewpassword);

userRoutes.get("/allusers", verifyToken, getalluser);

userRoutes.get("/logout", verifyToken, logout);

userRoutes.delete("/deleteuser", verifyToken, deleteuser)


module.exports = userRoutes;


//login , signup, getuser, edituser, allusers, logout, deleteuser