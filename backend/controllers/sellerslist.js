const { Sellers } = require("../models/sellersDb");

async function createSeller(req, res) {
  try {
    const { email } = req.body;

    const result = await Sellers.findOne({ email });
    if (result) {
      console.log("there is user");
      return res.json({
        exist: 1,
      });

      //    return res.json({
      //     msg:"You are already a seller!",
      //     success: True
      //   });
    } else {
      try {
        const newSeller = new Sellers({
          email,
        });

        await newSeller.save();

        return res.status(201).json({
          msg: "User Successfully Created",
          exist: 0,
          success: true,
          user: newSeller,
        });
      } catch (err) {
        console.log("err occ ", err);
      }
    }
  } catch (err) {
    console.log("error here");
  }
}

async function addProductToSeller(req, res) {
  const { email,productNew } = req.body;
  const result = await Sellers.findOne({ email });
  if (!result) {
    console.log(`There is no such seller like ${email} in seller list`);
    return res.json(`No seller as ${email}`);
  } else {
    try {
      await Sellers.findOneAndUpdate(
        { email: clientMailId }, // Filter criteria
        { $push: { products: productNew } } // Update operation
      );
      res.status(201).json("product added successfully. ");
    } catch (err) {
      console.log("error adding product to particular sellers list. ", err);
    }
  }
}

async function getAllMyProducts(req, res) {
  try {
    // Fetch all products from the collection
    const {email} = req.body
    const theSeller = await Sellers.find({email});

    const allMyProducts = theSeller.products
    
    // Check if there are no products
    if (allMyProducts.length === 0) {
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
      allMyProducts
    });
  } catch (err) {
    console.log("Error retrieving products:", err);
    res.status(500).json({
      msg: "Server error",
      success: false
    });
  }
}

//checkandSignup("newuser1","kmewrvmvp")

module.exports = { createSeller, addProductToSeller,getAllMyProducts };
