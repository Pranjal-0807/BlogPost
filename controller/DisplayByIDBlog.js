const BlogPost = require("../models/BlogPost");

let DisplayBlogById = (req, res) => {
  const idFromPathVariable = req.params.id;
  console.log("id:", typeof idFromPathVariable);
  BlogPost.findById(idFromPathVariable)
    .then((blog) => {
      if (!blog) {
        res.status(404).render("error");
      } else {
        res.render("blogs/individualBlog", { blog });
      }
    })
    .catch((err) => {
      console.log("Error while fetching blog by ID:", err);
      res.status(500).render("error");
    });
};

module.exports = DisplayBlogById;
