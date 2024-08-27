const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

const dotenv = require("dotenv");
dotenv.config();
const USER_NAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;
const DB_NAME = process.env.DB_NAME;

const dbURI = `mongodb+srv://${USER_NAME}:${PASSWORD}@merncluster.zan8h.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=mernCluster`;

// Ensure the server starts only after DB connection is established
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected to the DB");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("DB connection error:", err);
  });

const blogRoutes = require("./routes/blogRoutes");
const indexRoutes = require("./routes/indexRoutes");
const deleteBlog = require("./routes/deleteBlog");
const authenticationRoutes = require("./routes/authenticationRoutes");

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
// "{"
app.use(cookieParser());
function checkUSer(req, res, next) {
  const token = req.cookies.authenticationToken;
  // console.log(token);
  if (token) {
    jwt.verify(token, "mySecret", (err, decodedToken) => {
      if (err) {
        console.log(`Token is invalid: ${err}`);
        res.locals.user = null;
      } else {
        res.locals.user = decodedToken;
      }
    });
  } else {
    res.locals.user = null;
  }
  next();
}
app.use(checkUSer);
// "}"
// Use routes
app.use("/", indexRoutes);
app.use("/", authenticationRoutes);
app.use("/blogs", blogRoutes);
app.use("/deleteBlog", deleteBlog);

// 404 Error handling
app.use((req, res) => {
  res.status(404).render("error");
});
