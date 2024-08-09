const errorHandler = require("../Utils/Error");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../Models/userModel.js");

dotenv.config();
saltRounds = 10;

const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All the Fields Are Required"));
  }
  try {
    const userDetail = await User.findOne({ email });
    const userPassword = bcrypt.compare(password, userDetail.password);
    if (!userDetail || !userPassword) {
      return next(errorHandler(400, "Invalid Credentials"));
    }
    const token = jwt.sign(
      { id: userDetail._id, isAdmin: userDetail.isAdmin },
      process.env.JWT_SECRET_KEY
    );

    const { password: passkey, ...rest } = userDetail._doc;

    res
      .status(200)
      .json({ message: "User LoggedIn Successfully", rest, token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const google = async (req, res, next) => {
  const { email, name, profilePic } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET_KEY
      );
      console.log(user);
      const { password: passkey, ...rest } = user._doc;

      res
        .status(200)
        .json({ message: "User LoggedIn Successfully", rest, token });
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hash(generatePassword, saltRounds);
      const newUser = new User({
        username:
          name?.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email: email,
        password: hashedPassword,
        profilePicture: profilePic,
      });
      console.log(newUser);
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET_KEY
      );

      const { password: passkey, ...rest } = newUser._doc;

      res
        .status(200)
        .json({ message: "User LoggedIn Successfully", rest, token });
    }
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  const { email, name, profilePic } = req.body;

  try {
    var users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
};



module.exports = {
  registerUser,
  loginUser,
  google,
  getUser,
};
