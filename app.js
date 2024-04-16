const express = require('express');
const mongoose = require("mongoose");
const path = require("path")
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie} = require("./middlewares/authentication")

const dotenv = require('dotenv');
dotenv.config();


const app = express();
const port = 3000;

mongoose.connect(process.env.DB_URL).then(()=>{console.log("MongoDB Connected")});

const Blog = require("./models/blog")
const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
// app.use(express.static(path.resolve("./public")));
app.use(express.static('./public'));



app.get('/', async (req, res) => {
  const allBlogs = await Blog.find({}).populate("createdBy");
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  })
})

app.use("/user", userRoute)
app.use("/blog", blogRoute)

app.listen(port,() => {
  console.log(`Server RUnning at port ${port}`)
})