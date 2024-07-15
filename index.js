const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/items", (req, res) => {
  //code goes here
});

app.listen(port, () => {
  console.log("Server Running on port 3000");
});
