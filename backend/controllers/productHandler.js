const fileparser = require("./fileparser");
const { ProductData } = require("../models/storageModel");
const Seller = require("../models/sellers");
async function handleProduct(req, res) {
  
  let x = [];
  await fileparser(req)
    .then((data) => {
      x.push(data);
      const { name, email, description, collegeName, price, location } = req.body;
      const productId = Date.now()
      console.log("here", x[0].Location);
      //   const newProduct = new Allproduct({ email,name, description, price, collegeName, location, image });
      //       await newProduct.save();
      const newProductData = new ProductData({
        email,
        name,
        description,
        price,
        collegeName,
        location,
        productId,
        image: x[0].Location,  //Location is basically image string here
      });
      newProductData.save();

      (async () => {
        let theSeller = await Seller.findOne({email})
        console.log(theSeller.email,"email it si");
        console.log("Here is the product ID ",productId);
        await theSeller.products.push(productId)
        console.log(theSeller.products);
        theSeller.save()
        console.log("Id pushed to the products ");
       
  
  
        console.log("saved successfully to mongoDB>>>>>");;
        res.json({msg:"product added and all done."})
     })();


    })
    .catch((error) => {
      console.log("error while uploading.. ", error);
    });


}

module.exports = { handleProduct };

