const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = express();
const path = require("path"); 
const PORT = 8000;

app.use(express.static(path.join(__dirname, "../frontend"))); //first middleware
app.use(express.urlencoded({ extended: false })); //second middleware
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/accounts")
  .then(() => console.log("MongoDb Connected"));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const USER = new mongoose.model("Signup", userSchema);

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html")); //first middleware
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "Login.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "home.html"));
});

// SIGNUP

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body; //second middleware
  try {
    const existing = await USER.findOne({ email });

    if (existing) {
      return res.send(
        'User already axist  \n  <a href="/login" >Login Here <a>',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new USER({ name, email, password: hashedPassword });
    await newUser.save();
    res.redirect("/login");
    // res.send("User account created!!");
  } catch (error) {
    console.log("Error is :", error);
  }
});

// LOGIN  
                                                
//second middleware                     
                                                           
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const existed = await USER.findOne({ email });
  if (!existed) {
    res.send('Account Not Created  \n  <a href="/signup" > Create Here <a> ');
  }
  let ismatch = await bcrypt.compare(password, existed.password);
  if (!ismatch) {
    return res.send("Invalid User or password");
  }
  res.redirect("/home");
});

app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});

