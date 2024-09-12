const express = require('express');
const { showsignup, signup, showlogin, loginuser, logout, userprofile, editprofile, showedit, showemail, sendemail, showotp, sendotp, showsetnewpassword, setnewpassword } = require('../controller/user.controller');
const { verifyToken } = require('../helper/tokenVerify');
const { uploadprofile } = require('../helper/uploadimage');
const userRoutes = express.Router();


userRoutes.get("/signup", uploadprofile.single('profileimage'), showsignup); 
userRoutes.post("/signup", uploadprofile.single('profileimage'), signup);

userRoutes.get("/login", showlogin);
userRoutes.post("/login", loginuser);

userRoutes.get("/getuser", verifyToken, userprofile);

userRoutes.get("/edituser", verifyToken, uploadprofile.single('profileimage'), showedit);
userRoutes.post("/edituser", verifyToken, uploadprofile.single('profileimage'), editprofile);

userRoutes.get('/forgotpassword/email', showemail);
userRoutes.post('/forgotpassword/email',  sendemail);

userRoutes.get('/forgotpassword/otpverify',  showotp);
userRoutes.post('/forgotpassword/otpverify',  sendotp);

userRoutes.get('/forgotpassword/setnewpassword',  showsetnewpassword);
userRoutes.post('/forgotpassword/setnewpassword',  setnewpassword);

userRoutes.get("/logout", verifyToken, logout);


module.exports = userRoutes;


//login , signup, getuser, edituser, logout,