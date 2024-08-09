const jwt = require("jsonwebtoken");
const { errorHandle } = require("../Utils/Error");

const verifyToken = (req, res, next) => {
  const token = req.header.token;

  if (!token) {
    return next(errorHandle(401, "Unathorized Access"));
  }
  jwt.verify(token, process.env.JWT_SECERT_KEY, (err, user) => {
    if (err) {
      return next(errorHandle(401, "authorized access"));
    }
    req.user = user;
    next();
  });
};

module.exports = verifyToken;