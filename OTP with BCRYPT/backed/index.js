const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const path = require("path");
const app = express();
const PORT = 8000;

// ==================================================
// 1. MIDDLEWARE
// ==================================================

app.use(express.static(path.join(__dirname, "../frontend")));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// ==================================================
// 2. MONGODB CONNECTION
// ==================================================

mongoose
  .connect("mongodb://localhost:27017/accounts")
  .then(() => console.log("MongoDb Connected"));

// ==================================================
// 3. USER SCHEMA
// ==================================================

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  otp: {
    type: String,
  },

  otpExpires: {
    type: Date,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
});

// ==================================================
// 4. USER MODEL
// ==================================================

const USER = new mongoose.model("Signup", userSchema);

// ==================================================
// 5. NODEMAILER / EMAIL CONFIGURATION
// ==================================================


// TRANSPORTER K LIYE 2 CHEEZEIIN => EMAIL , APP PASSWORD

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "manokhan6292@gmail.com",
    pass: "vfaf ttpo qnkh hdla",
  },
});

// ==================================================
// 6. GET ROUTES / PAGES
// ==================================================

// Signup page

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

// Login page
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "Login.html"));
});

// Home page
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "home.html"));
});

// OTP page
app.get("/otppage", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "otp.html"));
});

// ==================================================
// 7. SIGNUP
// ==================================================

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existing = await USER.findOne({ email });

    if (existing) {
      return res.send('User already exist <br><a href="/login">Login Here</a>');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Math.random() => Ye 0 se 1 ke darmiyan random decimal deta hai  i.e 0.45
    // Math.floor() decimal hata deta hai

    // OTP expiry = 5 minutes
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    // Date.now() => 

    // Create new user
    const newUser = new USER({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires,
      isVerified: false,
    });

    // Save user in MongoDB
    await newUser.save();

    // Send OTP through email
    await transporter.sendMail({
      from: "manokhan6292@gmail.com",

      to: email,

      subject: "Your OTP Verification Code",

      html: `
        <h2>Account Verification</h2>

        <p>Hello ${name},</p>

        <p>Your OTP is:</p>

        <h1>${otp}</h1>

        <p>This OTP will expire in 5 minutes.</p>
      `,
    });

    console.log("OTP sent to:", email);

    // Go to OTP page
    res.redirect(`/otppage?email=${encodeURIComponent(email)}`);
  } catch (error) {
    console.log("Signup Error:", error);

    res.send("Something went wrong");
  }
});

// ==================================================
// 8. OTP VERIFICATION
// ==================================================

app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find user using email
    const user = await USER.findOne({ email });

    if (!user) {
      return res.send("User not found");
    }

    // Check OTP
    if (user.otp !== otp) {
      return res.send("Invalid OTP");
    }

    // Check OTP expiry
    if (user.otpExpires < new Date()) {
      return res.send("OTP has expired");
    }

    // Verify user
    user.isVerified = true;

    // Remove OTP
    user.otp = undefined;
    user.otpExpires = undefined;

    // Save changes
    await user.save();

    // Go to login page
    res.redirect("/login");
  } catch (error) {
    console.log("OTP Error:", error);

    res.send("Something went wrong");
  }
});

// ==================================================
// 9. LOGIN
// ==================================================

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find user
  const existed = await USER.findOne({ email });

  // User doesn't exist
  if (!existed) {
    return res.send(
      'Account Not Created <br><a href="/signup">Create Here</a>',
    );
  }

  // Compare entered password with hashed password
  const ismatch = await bcrypt.compare(password, existed.password);

  // Password incorrect
  if (!ismatch) {
    return res.send("Invalid User or password");
  }

  // Login successful
  res.redirect("/home");
});

// ==================================================
// 10. START SERVER
// ==================================================

app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});
