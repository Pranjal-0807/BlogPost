const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define the schema for the blog post
const blogPostSchema = new Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Create the model from the schema
const BlogPost = mongoose.model("BlogPost", blogPostSchema, "blogPosts");

module.exports = BlogPost;
