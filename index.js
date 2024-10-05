const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./Database/config.js");
const parser = require("body-parser");
const serverless = require("serverless-http");

dotenv.config();

const app = express();

//logging to check
app.use((req, res, next) => {
  console.log(`received request: ${req.method} ${req.url}`);
  next();
});

//cors
app.use(cors());

app.use((req, res, next) => {
  next();
});

app.options("*", cors());
app.use(parser.json());

//Error handler

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

connectDB();

app.use("/api/users/", require("./modules/Users/users.controller.js"));
app.use("/products", require("./modules/Products/product.controller.js"));
app.use("/brands", require("./modules/Brands/brand.controller.js"));
app.use("/subbrands", require("./modules/Subbrands/subbrand.controller.js"));

var listener = app.listen(process.env.PORT, function () {
  console.log("Listening on port" + listener.address().port);
});

const handler = serverless(app);

module.exports = { handler };
