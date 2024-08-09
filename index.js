const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./Database/config.js");
const authRouter = require("./Routes/authRouter");
const bodyparser = require('body-parser');
const serverless = require("serverless-http");

dotenv.config();

const app = express();
app.use(bodyparser.json())

//logging to check
app.use((req, res, next) => {
  console.log(`received request: ${req.method} ${req.url}`);
  next();
});

//cors

app.use(
  cors({
    origin: "*",
    method: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  next();
});

app.options("*", cors());
app.use(express.json());

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

const router = express.Router();

router.get("/", (_, res) => {
  res.send("Welcome to Wedding Wide API");
});

app.use("/api", router);
app.use("/auth", authRouter);


var listener = app.listen(process.env.PORT, function () {
    console.log('Listening on port' + listener.address().port)

})

const handler = serverless(app);

module.exports = {handler}
