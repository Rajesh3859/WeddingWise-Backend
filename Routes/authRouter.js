const express = require('express');
const { loginUser, registerUser, google, getUser } = require("../Controllers/auth.controller.js");

const router = express.Router();

router.get("/", (_, res) => {
    res.send("welcome to Auth Provider routes");
});

router.post("/register-user", registerUser);
router.post("/login-user", loginUser);
router.post("/google", google);
router.get("/user", getUser);

module.exports = router;
