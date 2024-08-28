const { ProductData } = require("../models/storageModel");

// Controller function to update a product
async function updateProduct(req, res) {
  try {
    console.log("Started updating product");

    // Extract fields from request body
    const { email, productId, description, price, collegeName, location, name } = req.body;

    console.log("Email and Product ID:", email, productId);

    // Find the product in the database
    const productExists = await ProductData.findOne({ email, productId });

    if (!productExists) {
      return res.status(404).json({ message: 'Product not found in ProductData collection' });
    }

    // Build the updates object with only the fields that are provided
    const updates = {};
    if (description) updates.description = description;
    if (price) updates.price = price;
    if (collegeName) updates.collegeName = collegeName;
    if (location) updates.location = location;
    if (name) updates.name = name;

    // If a file is uploaded, handle the file data
    // if (req.file) {
    //   updates.image = req.file.filename; // Assuming you want to store the filename
    // }

    // Update the product in the database
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

module.exports = { updateProduct };




// const { ProductData } = require("../models/storageModel");

// async function updateProduct(req, res) {
//     try {
//       const { email, productId, updates } = req.body; // Assuming email, productId, and updates are passed in the request body
//       console.log("here are email and prod id ", email,productId);
//       // Check if the product exists in the ProductData collection
//       const productExists = await ProductData.findOne({ email, productId });
  
//       if (!productExists) {
//         return res.status(404).json({ message: 'Product not found in ProductData collection' });
//       }
  
//       // Update the product with the provided changes
//       const updateResult = await ProductData.updateOne(
//         { email, productId },
//         { $set: updates }
//       );
  
//       if (updateResult.modifiedCount === 0) {
//         return res.status(400).json({ message: 'No changes were made to the product' });
//       }
  
//       res.status(200).json({ message: 'Product updated successfully' });
//     } catch (error) {
//       console.error('Error updating product:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   }

//   module.exports = {updateProduct}