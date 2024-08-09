const { Allproduct } = require("../models/allProducts");
const { Sellers } = require("../models/sellersDb");

async function uploadToAllProducts(req, res) {
  const { email,name, description, price, collegeName, location } = req.body;
  const image = req.file.buffer
  const productNew = {name, description, price, collegeName, location,image}
  try {
    
    
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

    try{
      const result = await Sellers.findOne({ email });
    if (!result) {
      console.log(`There is no such seller like ${email} in seller list`);
       console.log(`No seller as ${email}`);
    } else {
      try {
        
        console.log("the new product here ",productNew)
        await Sellers.findOneAndUpdate(
          { email: email }, // Filter criteria
          { $push: { products: productNew } } // Update operation
        );
        console.log("product added successfully to seller. ");
      } catch (err) {
        console.log("error adding product to particular sellers list. ", err);
      }
    }
    }catch(err){
      console.log("error adding product to respective seller.")
    }

    // Create and save a new product if it doesn't exist
    try {
      const newProduct = new Allproduct({ email,name, description, price, collegeName, location, image });
      await newProduct.save();

      return res.status(201).json({
        msg: "Product successfully created",
        exist: 0,
        success: true,
        product: "the new product with image", 
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
  //
  
}

module.exports = { uploadToAllProducts };
