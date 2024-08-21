const BlogPost = require("../models/BlogPost");

let DeleteBlog = (req, res) => {
  const idFromPathVariable = req.params.id;
  console.log("id:", typeof idFromPathVariable);
  BlogPost.findByIdAndDelete(idFromPathVariable)
    .then((result) => {
      if (!result) {
        res.status(404).render("error");
      } else {
        res.render("blogs/deleteBlog");
      }
    })
    .catch((err) => {
      console.log("Error while deleting blog by ID:", err);
      res.status(500).render("error");
    });
};

module.exports = DeleteBlog; 