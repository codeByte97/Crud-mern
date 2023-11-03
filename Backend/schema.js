const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    productName: String,
    Quantity: Number,
    Pid: Number,
    Price: Number,
});
const CartSchema = new mongoose.Schema({
    productName: String,
    Quantity: Number,
    Pid: Number,
    Price: Number,
});
const Product = mongoose.model("product", dataSchema);
const cart = mongoose.model("cart", CartSchema);
module.exports = { Product, cart };