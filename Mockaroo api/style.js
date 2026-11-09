// ye style.js waly saary apny practice hai 

const express = require("express");
const app = express();

const user = require("./MOCK_DATA.json");

app.get("/", (req, res) => {
  res.send(user);
});

app.get("/fetchUser", (req, res) => {
  let html = `
 <ul>

  ${user.map((data) => `<li> ${data.first_name} </li>`).join("")}

 `;
  res.send(html);
});

app.get("/alluser/api/:userid", (req, res) => {
  const id = req.params.userid;
  const found = user.find((data) => {
    data.id == id;
  });
  return res.send(found);
});
const port = 3000;

app.listen(port, () => {
  console.log("Server is running");
});
