const { ProductData } = require("../models/storageModel")


async function getAllProducts(req,res) {
    let results = await ProductData.find({})
    if(!results){
        console.log("No data found");
        return res.send("No items found")
    }
    return res.status(201).json({msg:"Products Found!",results})
    //res.send('<img src="' + results[0].image + '" alt="shoe" width="500" height="600"></img>');
}

module.exports = {getAllProducts}