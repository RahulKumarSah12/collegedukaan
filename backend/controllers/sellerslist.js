const dotenv = require("dotenv")
dotenv.config()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

        //const Sellerstoken = jwt.sign({ id: user._id, email: user.email }, process.env.SELLERS_TOKEN_SECRET, { expiresIn: '8h' });

        await newSeller.save();

        return res.status(201).json({
          msg: "User Successfully Created",
          exist: 0,
          success: true,
          user: newSeller,
          sellerToken : token
        });
      } catch (err) {
        console.log("err occ ", err);
      }
    }
  } catch (err) {
    console.log("error here");
  }
}

// async function addProductToSeller(req, res) {
//   const {  name, description, price, collegeName, location, image  } = req.body;
//   const image = req.file.buffer
//   console.log(email);
//   const result = await Sellers.findOne({ email });
//   if (!result) {
//     console.log(`There is no such seller like ${email} in seller list`);
//     return res.json(`No seller as ${email}`);
//   } else {
//     try {
//       await Sellers.findOneAndUpdate(
//         { email: email }, // Filter criteria
//         { $push: { products: productNew } } // Update operation
//       );
//       res.status(201).json("product added successfully. ");
//     } catch (err) {
//       console.log("error adding product to particular sellers list. ", err);
//     }
//   }
// }

async function getAllMyProducts(req, res) {
  try {
    // Fetch all products from the collection
    const {email} = req.body
    const theSeller = await Sellers.find({email});

    //console.log(theSeller[0]);

    const allMyProducts = theSeller[0].products
    console.log((theSeller));
    
    // Check if there are no products
    // if(allMyProducts.length == 0) {
    //   return res.status(404).json({
    //     msg: "No products found",
    //     success: false,
    //     products: []
    //   });
    // }
    const stringImageAllMyProducts = allMyProducts.map(product => {
      return {
          ...product, // Copy all fields
          image: Buffer.from(product.image).toString('base64') // Convert image to base64
      };
  });
    
    // Return the list of products
    res.status(200).json({
      msg: "Products retrieved successfully",
      success: true,
      stringImageAllMyProducts
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

module.exports = { createSeller, getAllMyProducts };
