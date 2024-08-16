const mongoose = require("mongoose");



const sellerSchema = new mongoose.Schema({
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

const Seller = new mongoose.model("Seller", sellerSchema);

module.exports = Seller;
