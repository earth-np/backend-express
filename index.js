const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const { apiRouter } = require("./src/api");
const { userRouter } = require("./src/userRoute");
const { User } = require("./src/model/userModel");
const cors = require("cors");
const jwt = require("jsonwebtoken");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const protect = async (req, res, next) => {
  const headerToken = req.headers["authorization"];
  if (!headerToken) {
    res.status(403).send("Not Auth");
  }
  const token = headerToken.split(" ")[1];
  if (!token) {
    res.status(403).send("Not Auth");
  }
  const data = jwt.decode(token);
  const user = await User.findById(data.userId);
  if (!user) {
    res.status(403).send("User not found");
  }
  req.userId = user._id;
  next();
};

// use api router
app.use("/api", protect, apiRouter);
app.use("/user", userRouter);

// basic route
app.get("/", (req, res) => {
  console.log("Hi from /");
  res.send("Hello world earth");
});

app.all("*", (req, res) => {
  res.send("404 not found earth");
});

// start app

const port = process.env.PORT || process.argv[2] || 8080;

// change to your mongodb url
mongoose
  .connect(
    "mongodb+srv://earth:testtest123123@cluster0.olxyu.mongodb.net/mern?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connect mongodb success");

    app.listen(port, () => {
      console.log("Run server on port:", port);
    });
  })
  .catch(() => {
    console.log("Connect mongodb error");
  });
