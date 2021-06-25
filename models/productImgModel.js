const mongoose = require("mongoose");

const imgSchema = mongoose.Schema({
  batch_id: {
    type: Number,
    required: true,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
});

const UploadImg = mongoose.model("UploadImg", imgSchema);

module.exports = UploadImg;
