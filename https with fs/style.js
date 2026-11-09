const http = require("http");

// const fs = require("fs");

const server = http.createServer((req, res) => {
  // let data = ` User come at ${new Date()} on this ${req.url} \n`;
  
  // fs.appendFile("myfile.txt", data, () => {
    if (req.url == "/") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("HOME PAGE");
    } else if (req.url == "/product") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("PRODUCT PAGE");
    } else if (req.url == "/about") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("ABOUT PAGE");
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 ERROR - Not Found!");
    }
  });
// });
const port = 3003;

server.listen(port, () => {
  console.log("Our server is starting now");
});

