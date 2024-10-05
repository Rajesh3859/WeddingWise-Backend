// users.model.js

const mongoose = require("mongoose");
const userSchema = require("./users.schema"); // Make sure the file path is correct

// Create and export the model
const User = mongoose.model("User", userSchema);
module.exports = User;
