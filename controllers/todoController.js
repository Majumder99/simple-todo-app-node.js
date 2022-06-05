var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mongoose = require("mongoose");

//Connect to database
mongoose.connect(
  "mongodb+srv://sourav:sourav52@cluster0.yizcs.mongodb.net/?retryWrites=true&w=majority"
);

//Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item: String,
});

var Todo = mongoose.model("Todo", todoSchema);
// var itemOne = Todo({ item: "Get flowers" }).save((err) => {
//   if (err) throw err;
//   console.log("Item saved");
// });

// var data = [
//   {
//     item: "Drink milk",
//   },
//   {
//     item: "Drink ice cream",
//   },
//   {
//     item: "Drink iced tea",
//   },
// ];

module.exports = (app) => {
  app.get("/todo", (req, res) => {
    //Get data from mongoDb and pass it to the view
    Todo.find({}, (err, data) => {
      if (err) throw err;
      res.render("todo", { todos: data });
    });
  });
  app.post("/todo", urlencodedParser, (req, res) => {
    //Get data from the view and add it to the mongoDb
    var newTodo = Todo(req.body).save((err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });
  app.delete("/todo/:item", (req, res) => {
    //Delete data from the mongoDb
    Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(
      (err, data) => {
        if (err) throw err;
        res.json(data);
      }
    );
    // data = data.filter((todo) => {
    //   return todo.item.replace(/ /g, "-") !== req.params.item;
    // });
    // res.json(data);
  });
};
