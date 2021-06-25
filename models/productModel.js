const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    brand_id: {
      type: String,
      required: true,
    },
    prod_name: {
      type: String,
      required: true,
    },
    prod_code: {
      type: Number,
      required: true,
    },
    season: {
      type: String,
      required: true,
    },
    fabric_comp: {
      type: Array,
      required: true,
    },
    fabcomp1: {
      type: String,
      required: true,
    },
    fabcomp2: {
      type: String,
      required: true,
    },
    fabper1: {
      type: String,
      required: true,
    },
    fabper2: {
      type: String,
      required: true,
    },
    apparel_category: {
      type: String,
      required: true,
    },
    specification: {
      type: Number,
      required: true,
    },
    product_description: {
      type: String,
      required: true,
    },
    batch_id: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    tech_packs: {
      type: Array,
      required: true,
    },
    bom: {
      type: Array,
      required: true,
    },
    badges: {
      type: Array,
    },
    signature: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      require: true,
    },
    Date_last_updated: {
      type: Date,
      require: true,
    },
    current_product_stage: {
      type: String,
      required: true,
    },
    Filter_by_category: {
      type: String,
      default: "jeans",
    },
  },
  { autoCreate: true }
);

const Product = mongoose.model("product", ProductSchema);
module.exports = Product;
