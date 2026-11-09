const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors()); 
mongoose
  .connect("mongodb+srv://manokhanasd123_db_user:KvMmbCVcijHzEONT@cluster0.42nszds.mongodb.net/?appName=Cluster0")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });
  
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/signupPost", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existed = await User.findOne({ email });
    if (existed) {
      return res.send("USER ALREADY EXIST");
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
 res.status(200).send("Signup successful");
  } catch (error) {
    console.log(error, "error agya ha");
    res.status(505).send("Internal server Error");

    //status code browser ko batanay k liye hota while msg user ko
  }
});


app.use('/loginPost' , async(req,res)=>{
  const {email , password} = req.body
  const existed = await User.findOne({email})
  if(!existed) {
    return res.send('USER NOT EXIST <a href="/signup">Signup<a>')
  }

  
 const isMatch = await bcrypt.compare(password, existed.password);

if (!isMatch) {
  return res.status(401).send("Wrong password");
}

  console.log(email , password)



  res.status(200).send("Login successful");

})

app.listen(8000, () => {
  console.log("MondoDb Connected");
});
