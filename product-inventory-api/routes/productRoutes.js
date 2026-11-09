const express = require("express");
const multer = require("multer");
const fs = require("fs");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductStats,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// CREATE UPLOAD FOLDER IF NOT EXISTS
// ==========================================

if (!fs.existsSync("uploads/products")) {
  fs.mkdirSync("uploads/products", {
    recursive: true,
  });
}

// ==========================================
// MULTER STORAGE
// ==========================================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/products");
  },

  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;

    cb(null, uniqueName);
  },
});

// ==========================================
// FILE FILTER
// ==========================================

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// ==========================================
// MULTER
// ==========================================

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// ==========================================
// ROUTES
// ==========================================

// GET ALL
router.get("/", getProducts);

// STATS
router.get("/stats/summary", protect, getProductStats);

// GET ONE
router.get("/:id", getProduct);

// CREATE
router.post("/", protect, upload.single("image"), createProduct);

// UPDATE
router.put("/:id", protect, upload.single("image"), updateProduct);

// DELETE
router.delete("/:id", protect, deleteProduct);

module.exports = router;
