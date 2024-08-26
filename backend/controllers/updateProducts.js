const { ProductData } = require("../models/storageModel");

async function updateProduct(req, res) {
    try {
      const { email, productId, updates } = req.body; // Assuming email, productId, and updates are passed in the request body
  
      // Check if the product exists in the ProductData collection
      const productExists = await ProductData.findOne({ email, productId });
  
      if (!productExists) {
        return res.status(404).json({ message: 'Product not found in ProductData collection' });
      }
  
      // Update the product with the provided changes
      const updateResult = await ProductData.updateOne(
        { email, productId },
        { $set: updates }
      );
  
      if (updateResult.modifiedCount === 0) {
        return res.status(400).json({ message: 'No changes were made to the product' });
      }
  
      res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  module.exports = {updateProduct}