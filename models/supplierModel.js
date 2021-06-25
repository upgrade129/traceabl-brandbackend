const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RegisterSchema = new Schema(
  {
    brand_id: {
      type: String,
      required: true,
    },
    brand_name: {
      type: String,
      required: true,
    },
    brand_email: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name_sup: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    name_poc: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    services: {
      type: String,
    },
    terms_and_conditions: {
      type: Boolean,
      required: true,
    },
    traceable_status: {
      type: String,
      required: true,
    },
    production_status: {
      type: String,
      required: true,
    },
    batch_id: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { autoCreate: true }
);

const Supplier = mongoose.model("supplier", RegisterSchema);
module.exports = Supplier;
