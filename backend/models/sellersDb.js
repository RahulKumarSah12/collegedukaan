const mongoose = require("mongoose");



const sellerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
  }
});

const Sellers = new mongoose.model("Seller", sellerSchema);

module.exports = {Sellers};
