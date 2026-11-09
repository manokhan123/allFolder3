const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check Authorization header
    if (!authHeader) {
      return next(createError(401, "Authentication token is required"));
    }

    // Example:
    // Bearer eyJhbGciOiJIUzI1Ni...
    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(createError(401, "Invalid authorization format"));
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store decoded user data
    req.user = decoded;

    next();
  } catch (error) {
    next(createError(401, "Invalid or expired token"));
  }
};

module.exports = authenticate;
