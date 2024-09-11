require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const port = process.env.PORT;
const URL = process.env.MONGO_URI || 'mongodb+srv://hitdobariya:hitdobariya@cluster0.ncl5d.mongodb.net/ecommerce';

app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const reviewRoutes = require('./routes/review.routes');
const addressRoutes = require('./routes/address.routes');
const cartRoutes = require('./routes/cart.routes');

const path = require('path');
app.use("profileimages", express.static(path.join(__dirname, 'profileimages')));
app.use("productimages", express.static(path.join(__dirname, 'productimages')));

app.get("/", (req, res) => {
  // res.render("boarding.ejs")
  res.json({ message: 'boarding page...' });
});

const ejs = require('ejs');
app.set("view engine", 'ejs');

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/cart", cartRoutes);

app.listen(port, async () => {
  await mongoose
    .connect(URL)
    .then(() => console.log(`Database Connected...`))
    .catch((err) => console.log(err));
  console.log(`Servere start at http://localhost:${port}`);
});