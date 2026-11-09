const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
 
const productRoutes = require("./routes/productRoutes");

const notFound = require("./middleware/notFoundMiddleware");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// ==========================================
// DATABASE
// ==========================================

connectDB();

// ==========================================
// SECURITY
// ==========================================

app.use(helmet());

app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 100,

  message: "Too many requests, please try again later.",
});

app.use(
  "/uploads",
  express.static("uploads")
);

app.use(
  "/api/products",
  productRoutes
);
app.use(limiter);

// ==========================================
// BODY PARSING
// ==========================================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

// ==========================================
// UPLOADS
// ==========================================

app.use("/uploads", express.static("uploads"));

// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Product Inventory API is running",
  });
});

// ==========================================
// AUTH ROUTES
// ==========================================

app.use("/api/auth", authRoutes);

// ==========================================
// PRODUCT ROUTES
// ==========================================

app.use("/api/products", productRoutes);

// ==========================================
// 404
// ==========================================

app.use(notFound);

// ==========================================
// ERROR HANDLER
// ==========================================

app.use(errorHandler);

// ==========================================
// SERVER
// ==========================================

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
