const mongoose = require("mongoose");
const productSchema = require("./product.schema"); // Make sure the file path is correct

// Create and export the model
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
