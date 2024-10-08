const userservices = require('../services/user.services');
const userservice = new userservices();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator')
const nodemailer = require('nodemailer')
require('dotenv').config()
const User = require('../model/user.model')


exports.showlogin = async (req, res) => {
    try {
        // res.render("login.ejs");
    } catch (error) {
        console.log(error);
        res.json({ messag: "Server error..." });
    }
};

exports.loginuser = async (req, res) => {

    try {
        let user = await userservice.isuser({ email: req.body.email, isDelete: false });
        if (!user) return res.status(404).json({ message: 'user not found...' });
        let matchpassword = await bcrypt.compare(req.body.password, user.password);
        if (!matchpassword) return res.status(400).json({ message: 'email or password incorrect...' });
        let token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        console.log(token);
        res.cookie('token', token);
        // res.redirect("api/products/product");
        res.json({ message: 'login successful...', token });
    } catch (error) {
        console.log(error);
        // res.render("login.ejs");
    }

};


exports.showsignup = async (req, res) => {

    try {
        // res.render("signup.ejs");
    } catch (error) {
        console.log(error);
        res.json({ messag: "Server error" });
    }

}

exports.signup = async (req, res) => {

    try {
        let imagepath = "";
        let user = await userservice.isuser({ email: req.body.email, isDelete: false });
        if (user) return res.status(400).json({ message: 'user already exists...' });
        if (req.file) { imagepath = req.file.path.replace(/\\/g, '/'); };
        if (req.body.password !== req.body.confirmpassword) return res.json({ message: 'confirmpassword not matched...' });
        let hashpasssword = await bcrypt.hash(req.body.password, 10);
        user = await userservice.register({ ...req.body, password: hashpasssword, confirmpassword: hashpasssword, profileimage: imagepath });
        // res.redirect("/api/user/login");
        res.json({ message: 'signup successful...', user });
    } catch (error) {
        console.log(error);
        // res.render("signup.ejs");
    }

};


exports.showemail = (req, res) => {

    try {
        // res.render('forgot-password-email'); 
    } catch (error) {
        console.log(error);
        res.json({ messag: "Server error" });
    }

};

exports.sendemail = async (req, res) => {

    try {
        const otpmail = req.body.email;
        console.log('OTP mail:', otpmail);
        let user = await userservice.isuser({ email: otpmail, isDelete: false });
        if (user) {
            const otp = otpGenerator.generate(4, {
                digits: true,
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            console.log('Generated OTP:', otp);
            await User.create({ email: otpmail, otp: otp });
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASS
                }
            });
            await transporter.sendMail({
                from: process.env.EMAIL,
                to: otpmail,
                subject: 'OTP Verification',
                text: `Your OTP for verification is: ${otp}`
            });
            const otpExpiry = Date.now() + 10 * 60 * 1000;
            user.otp = otp;
            user.otpExpiry = otpExpiry;
            await user.save();
            // res.redirect(`/api/user/forgotpassword/otpverify/otp?email=${otpmail}`);
            res.json({ message: 'email processed...', user: otp });
        } else {
            res.status(400).render("verifyemail.ejs", { message: "User not found..." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error..." });
        // res.render('forgot-password-email');
    }

};


exports.showotp = (req, res) => {

    try {
        // res.render('forgot-password-otp');
    } catch (error) {
        console.log(error);
        res.json({ messag: "Server error" });
    }

};


exports.sendotp = async (req, res) => {

    try {
        const otpmail = req.query.email;
        const  otp  = req.body;
        console.log(otpmail);

        const user = await userservice.isuser({ email: otpmail, isDelete: false });
        if (!user) return res.status(404).json({ message: 'User not found...' });
        if (user.otp !== otp || user.otpExpiry < Date.now()) { return res.status(400).json({ message: 'Invalid or expired OTP...' }); }
        res.json({ message: 'Otp verify success...' });
        // res.redirect(`/api/user/set-new-password/otp?email=${otpmail}`);
    } catch (error) {
        console.log(error);
        // res.render('forgot-password-otp');
    }

};


exports.showsetnewpassword = (req, res) => {

    try {
        // res.render('set-new-password');
    } catch (error) {
        console.log(error);
        res.json({ messag: "Server error" });
    }

};

exports.setnewpassword = async (req, res) => {

    try {
        const { email } = req.query;
        const { newPassword, confirmNewPassword } = req.body;
        if (newPassword !== confirmNewPassword) { return res.status(400).json({ message: 'Passwords do not match...' }); }
        const user = await userservice.isuser({ email, isDelete: false });
        if (!user) return res.status(404).json({ message: 'User not found...' });
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();
        res.status(200).json({ message: 'Password reset successful...' });
        // res.redirect('/api/user/login');
    } catch (error) {
        console.log(error);
        // res.render('set-new-password');
    }

};


exports.userprofile = async (req, res) => {

    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error...' });
    }

};


exports.showedit = async (req, res) => {

    try {
        // res.render("edit.ejs");
    } catch (error) {
        console.log(error);
        res.json({ messag: "Server error" });
    }

}

exports.editprofile = async (req, res) => {

    try {
        const userId = req.user._id;
        const updateData = req.body;
        let user = await userservice.edituser(userId, updateData);
        res.status(200).json({ message: 'Profile updated successfully...', user });
    } catch (error) {
        console.log(error);
        // res.render("edit.ejs");
    }

}


exports.logout = async (req, res) => {

    try {
        // res.redirect('/api/user/login').clearCookie('token');
        res.json({ message: 'logout successful... , token cleared...' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal server error...' });
    }

}