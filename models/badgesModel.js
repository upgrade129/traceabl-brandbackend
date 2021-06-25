const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BadgesSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    available_for: {
      type: Array,
      required: true,
    },
    badge_image: {
      type: String,
      required: true,
      default: "null",
    },
    claim: {
      type: Boolean,
      required: true,
    },
  },
  { autoCreate: true }
);

const Badges = mongoose.model("badges", BadgesSchema);
module.exports = Badges;
