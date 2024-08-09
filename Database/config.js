const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongoDB_URL = process.env.mongoDB_URL;

const connectDB = async (req, res) => {
  try {
    const connection = await mongoose.connect(mongoDB_URL);
    console.log("mongoDB Connected Successfully");
    return connection;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "MongoDB connection error" });
  }
};

module.exports = connectDB;
