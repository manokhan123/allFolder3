const mongoose = require("mongoose");

 
const connectdb = async()=>{
await mongoose
  .connect("mongodb://localhost:27017/accounts")
  .then(() => console.log("MongoDb Connected"));
}

module.exports =  connectdb;