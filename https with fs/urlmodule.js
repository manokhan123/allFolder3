const url = require("url");

let myurl = "http://localhost:8000/products?id=10&name=mobile";

let data = url.parse(myurl, true);

console.log(`HOSTNAME : ${data.host}`);
console.log(`PATHNAME  : ${data.pathname}`);

