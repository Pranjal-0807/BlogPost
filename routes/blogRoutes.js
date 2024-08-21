// routes/blogRoutes.js
const express = require("express");
const BlogPost = require("../models/BlogPost");
const router = express.Router();

const displayBlogs = require("../controller/DisplayBlogs");
const displayBlogById = require("../controller/DisplayByIDBlog");
const createBlog = require("../controller/CreateBlog");

// "{"
function isUserLoggedIn(req, res, next) {
  if (res.locals.user) {
    next();
  } else {
    res.redirect("/login");
  }
}
router.use(isUserLoggedIn);
// "}"

// Fetch all blogs from the database
router.get("/", displayBlogs);

// Show individual blog by ID
router.get("/id/:id", displayBlogById);

// Add a new blog through the form
router.post("/", createBlog);

module.exports = router;
