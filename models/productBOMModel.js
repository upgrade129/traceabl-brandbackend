const mongoose = require("mongoose");

const BOMSchema = mongoose.Schema({
  batch_id: {
    type: Number,
    required: true,
  },
  bom: {
    data: Buffer,
    contentType: String,
  },
});

const UploadBOM = mongoose.model("UploadBOM", BOMSchema);

module.exports = UploadBOM;
