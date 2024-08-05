const mongoose = require("mongoose");



const otpSchema = new mongoose.Schema({
  
  email: {
    type: String,
    required: true,
  },
  secret: {
    type: String,
    required: true,
  },
});

const Otpbase = new mongoose.model("otps", otpSchema);

module.exports = Otpbase;
