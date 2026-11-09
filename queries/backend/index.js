const express = require("express");
const app = express();
const cors = require('cors')
const mongoose = require("mongoose");
app.use(cors())


mongoose
  .connect("mongodb://localhost:27017/queries")
  .then(() => console.log("MongoDb Connected"));

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  city: String,
  salary: Number,
  skills: [String],
  isActive: Boolean,
});

// Model
const USER = mongoose.model("USERS", userSchema);

// Practice Data
// USER.create([
//   {
//     name: "Shamaz",
//     email: "shamaz@gmail.com",
//     age: 22,
//     city: "D.I Khan",
//     salary: 50000,
//     skills: ["HTML", "CSS", "JavaScript"],
//     isActive: true,
//   },

//   {
//     name: "Ali",
//     email: "ali@gmail.com",
//     age: 25,
//     city: "Lahore",
//     salary: 80000,
//     skills: ["JavaScript", "React", "Node.js"],
//     isActive: true,
//   },

//   {
//     name: "Ahmed",
//     email: "ahmed@gmail.com",
//     age: 17,
//     city: "Islamabad",
//     salary: 30000,
//     skills: ["HTML", "CSS"],
//     isActive: false,
//   },

//   {
//     name: "Usman",
//     email: "usman@gmail.com",
//     age: 30,
//     city: "Karachi",
//     salary: 120000,
//     skills: ["JavaScript", "Node.js", "MongoDB"],
//     isActive: true,
//   },

//   {
//     name: "Hamza",
//     email: "hamza@gmail.com",
//     age: 28,
//     city: "Lahore",
//     salary: 95000,
//     skills: ["React", "Node.js", "MongoDB"],
//     isActive: true,
//   },

//   {
//     name: "Bilal",
//     email: "bilal@gmail.com",
//     age: 19,
//     city: "Peshawar",
//     salary: 40000,
//     skills: ["HTML", "CSS", "JavaScript"],
//     isActive: false,
//   },

//   {
//     name: "Hassan",
//     email: "hassan@gmail.com",
//     age: 35,
//     city: "Islamabad",
//     salary: 150000,
//     skills: ["Java", "Spring", "MongoDB"],
//     isActive: true,
//   },

//   {
//     name: "Ayesha",
//     email: "ayesha@gmail.com",
//     age: 24,
//     city: "Lahore",
//     salary: 70000,
//     skills: ["JavaScript", "React"],
//     isActive: true,
//   },

//   {
//     name: "Sara",
//     email: "sara@gmail.com",
//     age: 21,
//     city: "Karachi",
//     salary: 55000,
//     skills: ["HTML", "CSS", "React"],
//     isActive: false,
//   },

//   {
//     name: "Zain",
//     email: "zain@gmail.com",
//     age: 27,
//     city: "Peshawar",
//     salary: 90000,
//     skills: ["Node.js", "MongoDB", "Express"],
//     isActive: true,
//   },
// ]);


// app.get('/find' , async(req,res)=>{
//   const users = await USER.find()
//   return res.json(users)
// })

// USER.create({
//   name  : 'Shamaz',
//   age: '31',
//   email :'shamaz1@gmail.com'
// })

// app.get('/find' , async(req,res)=>{
//   const users = await USER.find({name : 'Usman'})
//   return res.json(users)
// })


// app.get('/find' , async(req,res)=>{
//   const users = await USER.find({age : {$lte: 20}})
//   return res.json(users)
// })


app.get('/find' , async(req,res)=>{
  const users = await USER.find(
   {
     $or : [
      {age : {$gte:30}},
      {name : 'Shamaz'}
    ]
   }
  )
  return res.json(users)
})


app.listen(8000 , ()=>{
  console.log(`Server is Running on PORT 8000`)
})
