const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PublishSchema = new Schema(
  {
    publishdetails : {
      type: Array,
      required: true,
    },
    batch_id: {
      type: String,
      required: true,
    },
    prod_details: {
      type: Array,
      required: true,
    },
    brand_id: {
        type: String,
        requried : true,
    }
  },
  { autoCreate: true }
);

const Publish = mongoose.model("publish", PublishSchema);
module.exports = Publish;
