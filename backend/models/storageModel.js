const mongoose = require("mongoose");



const productDataScema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  collegeName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image:{
    type: String,
    required: true
  },
  productId:{
    type: Number,
    required: true
  }

});

const ProductData = new mongoose.model("ProductData", productDataScema);

module.exports = {ProductData};
//{name: 'Shoe', description: 'Good shoe very good', price: 100, stock: 2}