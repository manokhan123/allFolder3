const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const connection = require("./Connection/connection");
const router = require("./routers/router");
const app = express();
const PORT = 8000;

app.use(express.static(path.join(__dirname, "../frontend")));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

connection();

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});
