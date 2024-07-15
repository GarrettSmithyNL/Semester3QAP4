const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

const itemsRouter = require("./routes/items");
app.use("/items", itemsRouter);

app.listen(port, () => {
  console.log("Server Running on port 3000");
});
