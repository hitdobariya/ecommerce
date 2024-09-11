const crypto = require('crypto');
const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// const generateOTP = () => {
//     return crypto.randomInt(100000, 999999).toString();
// };

// const sendOTPEmail = async (email, otp) => {
//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: 'Your OTP for Password Reset',
//         text: `Your OTP for password reset is ${otp}. It will expire in 10 minutes.`,
//     };
//     await transporter.sendMail(mailOptions);
// };

const sendOTP = async (email) => {
    // const otp = generateOTP();
    // await sendOTPEmail(email, otp);
    // return otp;
};

module.exports = sendOTP;