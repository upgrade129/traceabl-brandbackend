const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema(
  {
    supp_id: {
      type: String,
      required: true,
    },
    supp_email: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
  },
  { autoCreate: true }
);

const Image = mongoose.model("image", ImageSchema);
module.exports = Image;
