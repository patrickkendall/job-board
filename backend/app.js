const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Post = require('./models/post');
const app = express();

//Connecting to MongoDB database

mongoose.connect('mongodb://localhost:27017/lite-dash')
.then(() => {
  console.log("Connected to database")
})
.catch(() => {
  console.log("Connection failed")
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

//Posting data for the first time

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob,
    state: req.body.state,
    city: req.body.city,
    zip: req.body.zip,
    institution: req.body.institution,
    degree: req.body.degree,
    gradYear: req.body.gradYear,
    major: req.body.major,
    minor: req.body.minor,
    org: req.body.org,
    position: req.body.position,
    jobStart: req.body.jobStart,
    jobEnd: req.body.jobEnd
  });
  post.save().then(result => {
    console.log("Post added successfully")
    console.log(result);
    res.status(201).json({
      message: 'Post added successfully'
    })
  });
});

//Updating existing posts

app.put("/api/posts/:id", (req, res, next) => {
  console.log(req.body._id);
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob,
    state: req.body.state,
    city: req.body.city,
    zip: req.body.zip,
    institution: req.body.institution,
    degree: req.body.degree,
    gradYear: req.body.gradYear,
    major: req.body.major,
    minor: req.body.minor,
    org: req.body.org,
    position: req.body.position,
    jobStart: req.body.jobStart,
    jobEnd: req.body.jobEnd
  });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({message: "Update successful"});
  })
});

//Getting posts from MongoDB to dynamically send and view on the front-end

app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents => {
      res.status(200).json({
        message: "Post fetched succesfully",
        posts: documents
    });
  });
});

//Dynamic param for fetching a post with a particular id

app.get("/api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if(post) {
      res.status(200).json(post);
    } else {
      res.send(404).json({message: 'Post not found'});
    };
  })
});

//Deleting a post from the backend

app.delete("/api/posts/:id", (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
  })
  res.status(200).json({message: "Post deleted"});
});

module.exports = app;
