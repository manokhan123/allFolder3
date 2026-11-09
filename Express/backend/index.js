// rest apis

// get , put,post,patch , delete

const express = require("express");
const path = require("path");
const app = express();

// middleware 

app.use(express.static(path.join(__dirname, "../frontend"))); // yahan par path ko combine karta hai 

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "Home.html"));
}); 

app.get("/about", (req, res) => {
  res.send("This is About PAGE");
});


app.get("/help", (req, res) => {
  res.send("This is Help PAGE");
});

app.listen(8000, () => {
  console.log(`Server is Running PORT 8000`);
});


