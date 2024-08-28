const ImageRejected = require("../models/rejectedImages");
const Seller = require("../models/sellers");
const { ProductData } = require("../models/storageModel");

async function deleteProduct(req,res) {
    try {
        const { email, productId } = req.body; // Assuming email and productId are passed in the request body
        // Find the seller by email and remove the productId from their products array
        let theProduct = await ProductData.findOne({email, productId})
        console.log("the product here>>",theProduct,"the image URL here >>>",theProduct.image);
        const sellerResult = await Seller.updateOne(
          { email },
          { $pull: { products: productId } }
        );
        
        // If no product was removed from the Seller collection, return a 404 response
        if (sellerResult.nModified === 0) {
          return res.status(404).json({ message: 'Product or seller not found in Seller collection' });
        }
    
        // Find and delete the document in the ProductData collection with the given email and productId
        const productResult = await ProductData.deleteOne({ email, productId });
    
        // If no product was removed from the ProductData collection, return a 404 response
        if (productResult.deletedCount === 0) {
          return res.status(404).json({ message: 'Product not found in ProductData collection' });
        }

        const rejected =  new ImageRejected({
          image : theProduct.image
        })
        rejected.save()
    
        res.status(200).json({ message: 'Product deleted successfully from both collections' });
      } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

module.exports = {deleteProduct}