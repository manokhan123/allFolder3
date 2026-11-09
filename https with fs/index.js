const http = require("http");

const fs = require("fs");

const PORT = 8000;

let server = http.createServer((req, res) => {
  if (req.url == "/favicon.ico") return res.end();

  let log = `${new Date()} : User Recieved on ${req.url}  \n`;

  fs.appendFile("log.txt", log, () => {
    if (req.url == "/") {
      res.write("This is Home Page");
      res.end();
    } else if (req.url == "/about") {
      res.write("This is About Page");
      res.end();
    } else if (req.url == "/help") {
      res.write("This is Help Page");
      res.end();
    } else {
      res.end("404 ERROR ! PAGE NOT FOUND");
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
