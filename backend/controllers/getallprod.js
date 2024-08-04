const { Allproduct } = require("../models/allProducts");

async function getAllProducts(req, res) {
  try {
    // Fetch all products from the collection
    const products = await Allproduct.find({});
    
    // Check if there are no products
    if (products.length === 0) {
      return res.status(404).json({
        msg: "No products found",
        success: false,
        products: []
      });
    }
    
    // Return the list of products
    res.status(200).json({
      msg: "Products retrieved successfully",
      success: true,
      products
    });
  } catch (err) {
    console.log("Error retrieving products:", err);
    res.status(500).json({
      msg: "Server error",
      success: false
    });
  }
}

module.exports = { getAllProducts };
