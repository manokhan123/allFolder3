const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = 8000;

// connection , schema , model

// CONNECTION
mongoose
  .connect("mongodb://localhost:27017/firstdb")
  .then(() => console.log("MongoDB CONNECTED"));

// SCHEMA --> structure (string hai ,number hai )

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  Phone: { type: Number, unique: true },
});

// model

const USER = new mongoose.model("Signups", userSchema);
const LOGIN = new mongoose.model("Login", userSchema);
  
app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});


//mongoose → object
//.connect() → method/function,,, Schema -> Constructor / class-like function

//mongoose.connect() → Promise return karta hai