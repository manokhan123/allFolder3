const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const createError = require("http-errors");

// ==========================================
// REGISTER
// POST /api/auth/register 
// ==========================================

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return next(createError(400, "Name, email and password are required"));
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(createError(409, "User with this email already exists"));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// LOGIN
// POST /api/auth/login
// ==========================================

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return next(createError(400, "Email and password are required"));
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return next(createError(401, "Invalid email or password"));
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return next(createError(401, "Invalid email or password"));
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
