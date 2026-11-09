// USING  EXPRESS-VALIDATOR

const express = require("express");
const { body, validationResult } = require("express-validator");

const app = express();

app.use(express.json());

app.post(
  "/signup",

  // Validation rules
  [
    body("name").notEmpty().withMessage("Name is required"),

    body("email").isEmail().withMessage("Enter a valid email"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],

  // Route handler
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    res.json({
      message: "Signup successful",
      data: req.body,
    });
  },
);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});

//===============================
// SANITIZE INPUTS
//===============================

const express = require("express");
const { body, validationResult } = require("express-validator");

const app = express();

app.use(express.json());

app.post(
  "/signup",

  [
    body("name").trim().notEmpty().withMessage("Name is required"),

    body("email")
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage("Valid email is required"),

    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],

  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    console.log(req.body);

    res.json({
      message: "Signup successful",
      data: req.body,
    });
  },
);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});

// ===============
// THROUGH CUSTOM VALIDATORS
//================

const express = require("express");
const { body, validationResult } = require("express-validator");

const app = express();

app.use(express.json());

app.post(
  "/signup",

  [
    body("name")
      .notEmpty()
      .withMessage("Name is required")

      // Custom validation
      .custom((value) => {
        if (/\d/.test(value)) {
          throw new Error("Name cannot contain numbers");
        }

        return true;
      }),
  ],

  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    res.json({
      message: "Signup successful",
    });
  },
);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
