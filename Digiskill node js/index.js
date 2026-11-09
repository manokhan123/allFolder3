const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/user", (req, res) => {
  console.log(req.body);
  res.send("User received");
  res.json({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
});

app.get("/contact", (req, res) => {
  res.send("This is a contact page");
});

app.listen(port, () => {
  console.log("our server is running");
});
