const express = require("express");
const app = express();
const port = 3000;

global.DEBUG = true;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
  return;
});

const itemsRouter = require("./routes/items");
app.use("/items", itemsRouter);

app.listen(port, () => {
  console.log("Server Running on port 3000");
});
