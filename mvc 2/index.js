const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const port = 8002;

app.get("/", (req, res) => {
  res.send("This is your first server");
});

app.listen(port, () => {
  console.log("server is running");
});


