const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

exports.verifyToken = async (req, res, next) => {

    let Authorization = req.cookies.token;
    if (!Authorization) return res.json({ message: 'not authorized...' });

    let payload = jwt.verify(Authorization, process.env.JWT_SECRET);
    if (!payload) return res.status(400).json({ message: 'unauthorized...' });
    console.log(payload);

    let user = await User.findOne({ _id: payload.userId });
    if (!user) return res.status(404).json({ message: 'user not found...' });

    req.user = user;
    next();

};