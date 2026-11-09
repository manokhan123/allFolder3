const express = require("express");
const app = express();
const users = require("./MOCK_DATA.json");
const PORT = 8000;

app.get("/allusers/api", (req, res) => {
  res.send(users);
});

app.get("/users", (req, res) => {
  let html = `
  <ul>
  ${users.map((data) => `<li>${data.first_name}</li>`).join("")} // here join is array method 

  //users ka data saara data mai aagya aur data main sy first_name ko access karo aur pir usko string mai b covert karo join kii madad sy  

  </ul>
  `;

  res.send(html);
});

app.get("/alluser/api/:userid", (req, res) => {
  const id = req.params.userid; //jo b upar number hota hai usko get karny k liye req.params use karty hai aur wo tb hota hai jab upar ':' ho
  const found = users.find((data) => data.id == id);
  return res.send(found);

});

app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});
