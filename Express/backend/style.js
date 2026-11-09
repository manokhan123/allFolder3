const express = require("express");
const app = express();
const path  = require('path');

app.use(express.static(path.join(__dirname,'')))

app.get("/", (req, res) => {
  res.send("this is the home page");
});
const port = 6001;
app.listen(port, () => {
  console.log("express server is running");
});