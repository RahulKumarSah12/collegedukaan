const mongoose = require("mongoose");



const sellerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  products:[
    {
      name: String,
      description: String,
      price: Number,
      collegeName: String,
      location: String,
      image: String,
    },
  ]
});

const Sellers = new mongoose.model("Seller", sellerSchema);

module.exports = {Sellers};
