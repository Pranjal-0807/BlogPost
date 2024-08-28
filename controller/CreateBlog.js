const BlogPost = require("../models/BlogPost");

let CreateBlog = (req, res) => {
  // {
  const userIDFromToken = res.locals.user.id;
  const blog = {
    title: req.body.title,
    summary: req.body.summary,
    content: req.body.content,
    author: userIDFromToken,
  };
  // }
  BlogPost.create(blog)
    .then(() => {
      res.redirect("/success");
    })
    .catch((err) => {
      console.log("Error while adding a new blog:", err);
      res.redirect("/failure");
    });
};

module.exports = CreateBlog;
