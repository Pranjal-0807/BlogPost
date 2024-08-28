const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// {
const { hashPassword, comparePassword } = require("../utils/passBcrypt");
// }
// importing user schema
const User = require("../models/UserModel");

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
// {
function getToken(email, id) {
  const secret = "mySecret";
  const token = jwt.sign({ email, id }, secret, { expiresIn: "7d" });
  return token;
}
// }
// "}"

router.post("/signup", (req, res) => {
  const obj = req.body;

  // Check if user with the same email already exists
  User.findOne({ email: obj.email })
    .then((existingUser) => {
      if (existingUser) {
        console.log("User with this email already exists");
        return res.status(400).send("User with this email already exists!");
      }

      // Hash the password
      return hashPassword(obj.password)
        .then((hashedPassword) => {
          obj.password = hashedPassword;

          // Create the user in the database
          return User.create(obj);
        })
        .then((user) => {
          console.log("User created successfully");

          // Generate token and set cookie
          // {
          const token = getToken(user.email, user._id);
          res.cookie("authenticationToken", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });
          // }
          // Redirect to blogs
          res.redirect("/blogs");
        });
    })
    .catch((err) => {
      console.log("Error during signup process:", err);
      res.status(500).send(`Error: ${err}`);
    });
});

router.post("/login", (req, res) => {
  // {
  const { email, password, _id } = req.body;
  // }
  console.log(req.body);

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        console.log("User not found");
        return res.status(400).send("User not found!");
      }

      // Compare the password
      return comparePassword(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            console.log("User logged in successfully!");

            // Generate token and set cookie
            // {
            const token = getToken(user.email, user._id);
            res.cookie("authenticationToken", token, {
              httpOnly: true,
              maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            // }
            // Redirect to blogs
            res.redirect("/blogs");
          } else {
            return res.status(400).send("Incorrect Password!");
          }
        })
        .catch((err) => {
          console.log("Error during password comparison:", err);
          res.status(500).send("Internal Server Error");
        });
    })
    .catch((err) => {
      console.log("Error during user lookup:", err);
      res.status(500).send("Internal Server Error");
    });
});

module.exports = router;
