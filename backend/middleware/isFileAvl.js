const multer = require("multer");
const { updateProduct } = require("../controllers/updateProducts");
const { editProduct } = require("../controllers/editProducts");

// Multer configuration for file upload
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
}).single("file");

// Middleware to check if a file is present
function isFilePresent(req, res, next) {
  upload(req, res, (err) => {
    if (err) {
      console.error("Error parsing form data:", err);
      return res.status(400).json({ message: "Error parsing form data" });
    }

    console.log("Form data parsed successfully");
    if (req.file) {
      console.log("File is present, going next");
      next() // Proceed to the next middleware or route handler
    } else {
      console.log("No file present, calling updateProduct directly");
      updateProduct(req, res); // Call updateProduct if no file is present
    }
  });
}

module.exports = { isFilePresent };
