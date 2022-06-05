var express = require("express");
var app = express();
var todoController = require("./controllers/todoController");

//set up template engine
app.set("view engine", "ejs");

//static fiels
app.use(express.static("./public")); // Every route

//Fire controllers

todoController(app);

//Listen port
app.listen(3000, (err) => {
  if (err) throw err;
  console.log("You are listening to post 3000");
});
