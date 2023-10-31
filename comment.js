// Create web server

// Import modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Comment = require("./models/Comment");

// Create web server
const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/comment", { useNewUrlParser: true });

// Set body parser
app.use(bodyParser.json());

// Set router
app.get("/comments", (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(comments);
    }
  });
});

app.post("/comments", (req, res) => {
  const comment = new Comment(req.body);
  comment.save(err => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete("/comments/:id", (req, res) => {
  Comment.deleteOne({ _id: req.params.id }, err => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

// Start web server
app.listen(3000, () => {
  console.log("Server is running");
});``