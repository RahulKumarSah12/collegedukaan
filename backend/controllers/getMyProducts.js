const Seller = require("../models/sellers")
const { ProductData } = require("../models/storageModel")

async function getMyProducts(req,res) {
    const {email} = req.body
    const theSeller = await Seller.findOne({email})
    const productIdArray = theSeller.products

    async function findProductsByIds(productIdArray) {
        try {
          const products = await ProductData.find({ productId: { $in: productIdArray } });
          return products;
        } catch (err) {
          console.error('Error finding products:', err);
          throw err; // Or handle the error appropriately
        }
      }

      findProductsByIds(productIdArray)
      .then(products => {
        res.status(201).json({msg: "products found", results:products})
        console.log('Found products:', products);
      })
      .catch(err => {
        console.error('Error:', err);
      });
    

}

module.exports = {getMyProducts}