const mongoose = require("mongoose");

const TpSchema = mongoose.Schema({
  batch_id: {
    type: Number,
    required: true,
  },
  tp: {
    data: Buffer,
    contentType: String,
  },
});

const UploadTp = mongoose.model("UploadTp", TpSchema);

module.exports = UploadTp;
