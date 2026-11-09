const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req);
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, World!\n");
});

const port = 3001;
server.listen(port, () => {
  console.log("server is running");
});
 


