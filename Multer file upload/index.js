const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =======================
// 1. Storage
// =======================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// =======================
// 2. File Filter
// =======================

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png|pdf/;

  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);  // cb(error, result) => result = true means accept the file
  } else {
    cb(new Error("Only JPG, JPEG, PNG and PDF files are allowed!"));
  }
};

// =======================
// 3. Multer
// =======================

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

// =======================
// 4. HTML Form
// =======================

app.get("/", (req, res) => {
  res.send(`
        <h2>Multiple File Upload</h2>

        <form action="/upload" method="POST" enctype="multipart/form-data">

            <input type="file" name="myFiles" multiple>

            <br><br>

            <button type="submit">Upload Files</button>

        </form>
    `);
});

// =======================
// 5. Multiple Files Route
// =======================

app.post("/upload", upload.array("myFiles", 5), (req, res) => {
  console.log(req.files);

  res.send("Files uploaded successfully!");
});

// =======================
// 6. Error Handling
// =======================

app.use((err, req, res, next) => {
  if (err) {
    return res.status(400).send(err.message);
  }

  next();
});

// =======================
// Server
// =======================

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
