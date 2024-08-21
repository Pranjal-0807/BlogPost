const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
// importing user schema
const User = require("../models/UserModel");

// "{"
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// "}"

// Signup route
router.get("/signup", (req, res) => {
  res.render("authentication/signup");
});

// Login route
router.get("/login", (req, res) => {
  res.render("authentication/login");
});

// "{"
router.get("/logout", (req, res) => {
  res.clearCookie("authenticationToken");
  res.redirect("/login");
});
// "}"

router.use(bodyParser.urlencoded({ extended: true }));

// "{"
router.use(cookieParser());
function getToken(email) {
  const secret = "mySecret";
  const token = jwt.sign({ email }, secret);
  return token;
}
// "}"

router.post("/signup", async (req, res) => {
  const obj = req.body;
  console.log(obj);
  User.create(obj)
    .then((user) => {
      console.log("User created successfully");
      // "{"
      const token = getToken(user.email);
      res.cookie("authenticationToken", token);
      // "}"
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(`Error: ${err}`);
    });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        console.log("User not found");
      } else if (user.password !== password) {
        res.status(400).send("Incorrect Password!");
      } else {
        console.log("User logged in successfully!");
        // "{"
        const token = getToken(user.email);
        res.cookie("authenticationToken", token);
        // "}"
        res.redirect("/blogs");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(`Error: ${err}`);
    });
});

module.exports = router;
