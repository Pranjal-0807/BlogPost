const express = require("express");
const router = express.Router();

// Home route
router.get("/", (req, res) => {
  res.render("blogs/blogPost");
  // OR => because we have set the views directory in app.js
  // res.render("../views/blogs/blogPost");
});

// About route
router.get("/about", (req, res) => {
  res.render("about");
});

// New blog route
router.get("/newBlog", (req, res) => {
  res.render("blogs/newBlog");
});

// Success route
router.get("/success", (req, res) => {
  res.render("success");
});

// Failure route
router.get("/failure", (req, res) => {
  res.render("failure");
});

module.exports = router;