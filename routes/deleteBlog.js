const express = require("express");
const BlogPost = require("../models/BlogPost");
const router = express.Router();

const deleteBlog = require("../controller/DeleteBlog");

// Delete a blog by ID
router.get("/id/:id", deleteBlog);

module.exports = router;
  