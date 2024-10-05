const bcrypt = require("bcrypt");
const UsersRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("./users.model");
const { Types } = require("mongoose");

dotenv.config();
const saltRounds = 10; // Declare with const

// Register user route
//localhost:3001/Users/register-user
http: UsersRouter.post("/register-user", async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
});

// Login user route
//localhost:3001/Users/login-user
UsersRouter.post("/login-user", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const userDetail = await User.findOne({ email });
    if (!userDetail) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, userDetail.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: userDetail._id, isAdmin: userDetail.isAdmin },
      process.env.JWT_SECRET_KEY
    );

    const { password: passkey, ...rest } = userDetail._doc;

    res
      .status(200)
      .json({ message: "User logged in successfully", rest, token });
  } catch (error) {
    next(error);
  }
});

// Google authentication route
//localhost:3001/Users/google
UsersRouter.post("/google", async (req, res, next) => {
  const { email, name, profilePic } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET_KEY
      );

      const { password: passkey, ...rest } = user._doc;
      return res
        .status(200)
        .json({ message: "User logged in successfully", rest, token });
    } else {
      // Generate a random password for new users
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = await bcrypt.hash(generatePassword, saltRounds);

      const newUser = new User({
        username:
          name?.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: profilePic || "", // Ensure a profile picture is available or default to empty
      });

      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET_KEY
      );

      const { password: passkey, ...rest } = newUser._doc;

      res.status(201).json({
        message: "User registered and logged in successfully",
        rest,
        token,
      });
    }
  } catch (error) {
    next(error);
  }
});

// Get user by ID route
//localhost:3001/Users/user/1
UsersRouter.get("/user/:userId", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const response = await User.findById(Types.ObjectId(userId)); // Use findById for cleaner code

    if (response) {
      return res.status(200).json({
        message: "User fetched successfully",
        data: response,
      });
    } else {
      return res.status(404).json({
        message: "No User found",
        data: {},
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
});

module.exports = UsersRouter;
