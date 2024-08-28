const fileparser = require("./fileparser");
const { ProductData } = require("../models/storageModel"); // Adjust path as necessary
const editParseFile = require("./editFileParser");

async function editProduct(req, res) {
  console.log("Entering editProduct...");
  try {
    // Initialize newImageUrl outside of the promise chain
    let newImageUrl;

    // Use fileparser to handle file upload and form data parsing
    const { email, productId } = await editParseFile(req)   //fileparser change the function when required
      .then((data) => {
        // Extract form data from req.body
        const { email, productId } = req.body;

        console.log("Processing data for:", email, productId);

        // Extract image URL if available from S3
        if (data) {
          newImageUrl = data.Location; // Get the image URL from S3
        }
        console.log("New image URL:", newImageUrl);

        // Return the object to be destructured
        return { email, productId };
      })
      .catch((error) => {
        console.error("Error uploading image to S3:", error);
        throw new Error('Error uploading image'); // Re-throw the error to be caught by the try-catch block
      });

    // Log extracted values for debugging
    console.log("Image URL:", newImageUrl);
    console.log("Email:", email);
    console.log("Product ID:", productId);

    // Build the updates object with only the fields that need to be updated
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.description) updates.description = req.body.description;
    if (req.body.price) updates.price = req.body.price;
    if (req.body.collegeName) updates.collegeName = req.body.collegeName;
    if (req.body.location) updates.location = req.body.location;
    if (newImageUrl) updates.image = newImageUrl; // Update image URL if a new image is uploaded

    // Check if the product exists in the ProductData collection
    const productExists = await ProductData.findOne({ email, productId });

    if (!productExists) {
      return res.status(404).json({ message: 'Product not found in ProductData collection' });
    }

    // Update the product in the ProductData collection
    const updateResult = await ProductData.updateOne(
      { email, productId },
      { $set: updates }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(400).json({ message: 'No changes were made to the product in ProductData collection' });
    }

    res.status(200).json({ message: 'Product updated successfully in ProductData collection' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { editProduct };


// const fileparser = require("./fileparser");
// const { ProductData } = require("../models/storageModel"); // Adjust path as necessary

// async function editProduct(req, res) {
//   console.log("here >>>>>>>>on next")
//   try {
//     // Initialize newImageUrl outside of the promise chain
//     let newImageUrl;

//     // Handle file parsing and extract data
//     const { email, productId} = await fileparser(req)
//       .then((data) => {
//         const { email, productId } = req.body;
//         console.log("here starts ", email, productId);

//         // Extract image URL if available
//         if (data) {
//             // console.log("entered here",data);
//           newImageUrl = data.Location; // Get the image URL from S3
//         }
//         console.log("image url here",newImageUrl);

//         // Return the object to be destructured
//         return { email, productId, newImageUrl };
//       })
//       .catch((error) => {
//         console.error("Error uploading image to S3:", error);
//         throw new Error('Error uploading image'); // Re-throw the error to be caught by the try-catch block
//       });

//     // Log extracted values for debugging
//     console.log(newImageUrl, "henry image here .....");
//     console.log(email);
//     console.log("henry name ....", req.body.name);

//     // Build the updates object with only the fields that need to be updated
//     const updates = {};
//     if (req.body.name) updates.name = req.body.name;
//     if (req.body.description) updates.description = req.body.description;
//     if (req.body.price) updates.price = req.body.price;
//     if (req.body.collegeName) updates.collegeName = req.body.collegeName;
//     if (req.body.location) updates.location = req.body.location;
//     if (newImageUrl) updates.image = newImageUrl; // Update image URL if a new image is uploaded

//     // Verify that ProductData is a valid Mongoose model
//     // Check if the product exists in the ProductData collection
//     const productExists = await ProductData.findOne({ email, productId });

//     if (!productExists) {
//       return res.status(404).json({ message: 'Product not found in ProductData collection' });
//     }

//     // Update the product in the ProductData collection
//     const updateProductDataResult = await ProductData.updateOne(
//       { email, productId },
//       { $set: updates }
//     );

//     if (updateProductDataResult.modifiedCount === 0) {
//       return res.status(400).json({ message: 'No changes were made to the product in ProductData collection' });
//     }

//     res.status(200).json({ message: 'Product updated successfully in ProductData collection' });
//   } catch (error) {
//     console.error('Error updating product:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }

// module.exports = { editProduct };



// //edit with formdata
// const fileparser = require("./fileparser");
// const ProductData = require("../models/storageModel"); // Adjust path as necessary
// const Seller = require("../models/sellers"); // Adjust path as necessary

// async function editProduct(req, res) {
//   try {

//     let newImageUrl
//     await fileparser(req)
//       .then((data) => {
//         const { email, productID } = req.body;
//         console.log(typeof(productID));
//         let productId = parseInt(productID)
        
//         console.log(">>>>here>>>>",email,productId, ">>>>");
//         if (data && data[0] && data[0].Location) {
//           newImageUrl = data[0].Location; // Get the image URL from S3
//         }

//       })
//       .catch((error) => {
//         console.error("Error uploading image to S3:", error);
//         return res.status(500).json({ message: 'Error uploading image' });
//       });
//       const updates = {};
//       if (req.body.name) updates.name = req.body.name;
//       if (req.body.description) updates.description = req.body.description;
//       if (req.body.price) updates.price = req.body.price;
//       if (req.body.collegeName) updates.collegeName = req.body.collegeName;
//       if (req.body.location) updates.location = req.body.location;
//       if (newImageUrl) updates.image = newImageUrl; // Update image URL if a new image is uploaded
//       console.log("here is product id ",typeof(productId));
      
//       const productExists =await ProductData.findOne({ email, productId });
//       if (!productExists) {
//           return res.status(404).json({ message: 'Product not found in ProductData collection' });
//         }

//       const updateProductDataResult = await ProductData.updateOne(
//           { email, productId },
//           { $set: updates }
//         );
//       if (updateProductDataResult.modifiedCount === 0) {
//           return res.status(400).json({ message: 'No changes were made to the product in ProductData collection' });
//         }

//       res.status(200).json({ message: 'Product updated successfully in both collections' })

//   } catch (error) {
//     console.error('Error updating product:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }

// module.exports = { editProduct };
