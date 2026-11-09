const mongoose = require("mongoose");

// connection , schema , modal

// connection

mongoose
  .connect("mongodb://localhost:27017/secondDB")
  .then(() => console.log("MONGODB IS CONNECTED"));

