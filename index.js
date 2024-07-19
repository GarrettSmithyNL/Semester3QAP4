const express = require("express");
const methodOverride = require("method-override");
const app = express();
const port = 3000;

global.DEBUG = false;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index.ejs");
  return;
});

const itemsRouter = require("./routes/items");
app.use("/items", itemsRouter);

app.listen(port, () => {
  console.log("Server Running on port 3000");
});
