// Importing Required Modules
const express = require("express");
const methodOverride = require("method-override");
// Creating an Express App
const app = express();
// Setting the Port
const port = 3000;

global.DEBUG = false;

// Setting the View Engine
app.set("view engine", "ejs");
// Setting the Public Directory
app.use(express.static(__dirname + "/public"));
// Setting the Body Parser
app.use(express.json());
// Setting the urlencoded
app.use(express.urlencoded({ extended: true }));
// Setting the Method Override
app.use(methodOverride("_method"));

// Setting the Routes
// Home Route
app.get("/", (req, res) => {
  res.render("index.ejs");
  return;
});

// Items Route
const itemsRouter = require("./routes/items");
app.use("/items", itemsRouter);

// Starting the Server
app.listen(port, () => {
  console.log("Server Running on port 3000");
});
