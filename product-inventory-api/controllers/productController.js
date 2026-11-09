const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");

// ==========================================
// CREATE PRODUCT
// POST /api/products
// ==========================================

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock } = req.body;

  // Create product
  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock,
    image: req.file ? req.file.path : null,

    // IMPORTANT:
    // JWT mein id save ki gayi hai
    createdBy: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});

// ==========================================
// GET ALL PRODUCTS
// GET /api/products
// ==========================================

const getProducts = asyncHandler(async (req, res) => {
  const filter = {};

  // CATEGORY FILTER
  if (req.query.category) {
    filter.category = req.query.category.toLowerCase();
  }

  // SEARCH BY NAME
  if (req.query.search) {
    filter.name = {
      $regex: req.query.search,
      $options: "i",
    };
  }

  // PAGINATION
  const page = Number(req.query.page) || 1;

  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  // SORTING
  let sort = {
    createdAt: -1,
  };

  if (req.query.sort === "price_asc") {
    sort = {
      price: 1,
    };
  }

  if (req.query.sort === "price_desc") {
    sort = {
      price: -1,
    };
  }

  if (req.query.sort === "date_asc") {
    sort = {
      createdAt: 1,
    };
  }

  if (req.query.sort === "date_desc") {
    sort = {
      createdAt: -1,
    };
  }

  // TOTAL PRODUCTS
  const totalProducts = await Product.countDocuments(filter);

  // GET PRODUCTS
  const products = await Product.find(filter)
    .populate("createdBy", "name email")
    .sort(sort)
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    totalProducts,
    currentPage: page,
    totalPages: Math.ceil(totalProducts / limit),
    count: products.length,
    products,
  });
});

// ==========================================
// GET SINGLE PRODUCT
// GET /api/products/:id
// ==========================================

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "createdBy",
    "name email",
  );

  if (!product) {
    res.status(404);

    throw new Error("Product not found");
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// ==========================================
// UPDATE PRODUCT
// PUT /api/products/:id
// ==========================================

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);

    throw new Error("Product not found");
  }

  product.name = req.body.name ?? product.name;

  product.description = req.body.description ?? product.description;

  product.price = req.body.price ?? product.price;

  product.category = req.body.category ?? product.category;

  product.stock = req.body.stock ?? product.stock;

  // If new image uploaded
  if (req.file) {
    product.image = req.file.path;
  }

  const updatedProduct = await product.save();

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product: updatedProduct,
  });
});

// ==========================================
// DELETE PRODUCT
// DELETE /api/products/:id
// ==========================================

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);

    throw new Error("Product not found");
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// ==========================================
// PRODUCT STATISTICS
// GET /api/products/stats/summary
// ==========================================

const getProductStats = asyncHandler(async (req, res) => {
  const stats = await Product.aggregate([
    {
      $group: {
        _id: "$category",

        productCount: {
          $sum: 1,
        },

        averagePrice: {
          $avg: "$price",
        },
      },
    },

    {
      $project: {
        _id: 0,

        category: "$_id",

        productCount: 1,

        averagePrice: {
          $round: ["$averagePrice", 2],
        },
      },
    },

    {
      $sort: {
        productCount: -1,
      },
    },
  ]);

  res.status(200).json({
    success: true,
    stats,
  });
});

// ==========================================
// EXPORTS
// ==========================================

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductStats,
};
