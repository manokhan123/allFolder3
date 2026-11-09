const mongoose = require("mongoose");


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


module.exports  = USER 