const mongoose = require("mongoose");



const allProductSchema = new mongoose.Schema({
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
    type: Buffer,
    required: true
  }
});

const Allproduct = new mongoose.model("Allproduct", allProductSchema);

module.exports = {Allproduct};
//{name: 'Shoe', description: 'Good shoe very good', price: 100, stock: 2}