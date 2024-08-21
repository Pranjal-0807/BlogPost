const BlogPost = require("../models/BlogPost");

let CreateBlog = (req, res) => {
  const newBlog = new BlogPost(req.body);
  newBlog
    .save()
    .then(() => {
      res.redirect("/success");
    })
    .catch((err) => {
      console.log("Error while adding a new blog:", err);
      res.redirect("/failure");
    });
};

module.exports = CreateBlog;
