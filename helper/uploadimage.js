const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'profileimages/');
    },
    filename: function (req, file, cb) {
        cb(null,`${Date.now()}_${file.originalname}`);
    }

});

exports.uploadprofile = multer({ storage: storage });


const storages = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'productimages/');
    },
    filename: function (req, file, cb) {
        cb(null,`${Date.now()}_${file.originalname}`);
    }

});

exports.uploadproduct = multer({ storage: storages });