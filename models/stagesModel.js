const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stagesSchema = new Schema(
  {
    stage_id: {
      type: Number,
      required: true,
    },
    stage_title: {
      type: String,
      required: true,
    },
  },
  { autoCreate: true }
);

const stages = mongoose.model("chainStages", stagesSchema);
module.exports = stages;
