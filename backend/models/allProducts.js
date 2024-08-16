const mongoose = require("mongoose");



const allProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  products:  [{
    type: mongoose.Schema.Types.ObjectId,
  }]

});

const Product = new mongoose.model("Product", allProductSchema);

module.exports = Product;