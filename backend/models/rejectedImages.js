const mongoose = require("mongoose");

const rejectedImageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true}
});

const ImageRejected = mongoose.model("ImageRejected", rejectedImageSchema);

module.exports = ImageRejected;