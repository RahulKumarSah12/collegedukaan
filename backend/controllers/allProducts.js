const { Allproduct } = require("../models/allProducts");

async function uploadToAllProducts(req, res) {
  try {
    const { name, description, price, collegeName, location } = req.body;
    const image = req.file.buffer
    console.log(req.body);

    // Check if the product already exists
    const existingProduct = await Allproduct.findOne({ image });
    if (existingProduct) {
      console.log("The product already exists");
      return res.json({
        exist: 1,
        msg: "Product already exists",
        success: false,
      });
    }

    // Create and save a new product if it doesn't exist
    try {
      const newProduct = new Allproduct({ name, description, price, collegeName, location, image });
      await newProduct.save();

      return res.status(201).json({
        msg: "Product successfully created",
        exist: 0,
        success: true,
        product: newProduct, 
      });
    } catch (err) {
      console.log("Error occurred while saving the product:", err);
      return res.status(500).json({
        msg: "Error saving the product",
        success: false,
      });
    }
  } catch (err) {
    console.log("Error occurred while checking the product:", err);
    return res.status(500).json({
      msg: "Error checking the product",
      success: false,
    });
  }
}

module.exports = { uploadToAllProducts };
