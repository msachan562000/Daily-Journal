const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
let posts = [];

const _ = require("lodash");
const contactContent = "www.vit.ac.in"

const homeStartingContent = "Tesla’s mission is to accelerate the world’s transition to sustainable energy.Tesla was founded in 2003 by a group of engineers who wanted to prove that people didn’t need to compromise to drive electric – that electric vehicles can be better, quicker and more fun to drive than gasoline cars. Today, Tesla builds not only all-electric vehicles but also infinitely scalable clean energy generation and storage products. Tesla believes the faster the world stops relying on fossil fuels and moves towards a zero-emission future, the better.Launched in 2008, the Roadster unveiled Tesla’s cutting-edge battery technology and electric powertrain. From there, Tesla designed the world’s first ever premium all-electric sedan from the ground up – Model S – which has become the best car in its class in every category. Combining safety, performance, and efficiency, Model S has reset the world’s expectations for the car of the 21st century with the longest range of any electric vehicle, over-the-air software updates that make it better over time, and a record 0-60 mph acceleration time of 2.28 seconds as measured by Motor Trend. In 2015, Tesla expanded its product line with Model X, the safest, quickest and most capable sport utility vehicle in history that holds 5-star safety ratings across every category from the National Highway Traffic Safety Administration. Completing CEO Elon Musk’s “Secret Master Plan,” in 2016, Tesla introduced Model 3, a low-priced, high-volume electric vehicle that began production in 2017. ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true,
  useUnifiedTopology: true
}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://admin-yash:Tanishq562000@cluster0.7ouhp.mongodb.net/blogdb", {
  useNewUrlParser: true
});

const blogSchema = {
  title: String,
  content: String
};
const Blog = mongoose.model("Blog", blogSchema);




app.get("/", function(req, res) {
  Blog.find({}, function(err, foundBlog) {
    res.render("home", {
      startingcontent: homeStartingContent,
      posts: foundBlog
    });
  })
});



app.get("/compose", function(req, res) {
  Blog.find({}, function(err, foundBlog) {

      res.render("compose", {
        startingcontent: homeStartingContent,
        posts: foundBlog
      });

    //console.log(foundBlog.content);

  //res.redirect("/");

});
});




app.post("/compose", function(req, res) {

  const titlename = _.capitalize(req.body.posttitle);
  const contentname = req.body.postbody;

  const blog = new Blog({
    title: titlename,
    content: contentname
  });
  Blog.findOne({
    title: titlename
  }, function(err, foundBlog) {
    if (!foundBlog) {

      blog.save()
          res.redirect("/");



    } else {
      res.render("existingpost", {
        t1: foundBlog.title
      })
      //res.redirect("/");
    }
  });
});





app.get("/posts/:postId", function(req, res) {

  const requestedPostId = (req.params.postId);

  Blog.findOne({
    _id: requestedPostId
  }, function(err, blog) {
    res.render("post", {
      content: blog.content,
      title: blog.title
    });
  })
});



app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});

let port=process.env.PORT;
if(port==null||port==""){
  port=3000;
}

app.listen(port, function() {
  console.log("server is on port 3000");
});
