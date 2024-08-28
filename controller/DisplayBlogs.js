const BlogPost = require("../models/BlogPost");

let displayBlogs = (req, res) => {
  // {
  const userIDFromToken = res.locals.user.id;
  BlogPost.find({ author: userIDFromToken })
    .populate("author")
    // }
    .then((blogs) => {
      res.render("../views/blogs/blogs", { blogs });
    })
    .catch((err) => {
      console.log("Error while fetching blogs:", err);
      res.status(500).render("error");
    });
};

module.exports = displayBlogs;
