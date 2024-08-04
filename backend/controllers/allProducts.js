const { Allproduct } = require("../models/allProducts");

async function uploadToAllProducts(req, res) {
    //{name: 'Shoe', description: 'Good shoe very good', price: 100, stock: 2}
  try {
    const { name,description,price,stock } = req.body;
    console.log(req.body);
    const result = await Allproduct.findOne({ name,description,price });
    console.log(result);
    if (result) {
      console.log("the product already exists");
      return res.json({
        exist: 1,
      });

      //    return res.json({
      //     msg:"You are already a seller!",
      //     success: True
      //   });
    } else {
      try {
        const newAllproduct = new Allproduct({
            name,description,price,stock
        });

        await newAllproduct.save();

        return res.status(201).json({
          msg: "product Successfully Created",
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

//checkandSignup("newuser1","kmewrvmvp")

module.exports = {uploadToAllProducts};