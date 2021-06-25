const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const stagesSchema = new Schema({
//     1:{
//         default:"faber"
//     },
//     2:{
//         default:"Fabric"
//     },
//     3:{
//         default:"Trims and accessories"
//     },
//     4:{
//         default:"Dyeing"
//     },
//     5:{
//         default:"CMT"
//     },
//     6:{
//         default:"Processing"
//     }

// });
// const stages = mongoose.model('supplyChain', stagesSchema);
// module.exports = stages;

const supplyChainSchema = new Schema(
  {
    supplier_id: {
      type: Array,
      required: true,
    },
    brand_id: {
      type: String,
      required: true,
    },
    batch_id: {
      type: Number,
      required: true,
    },
    stages: {
      type: Array,
      required: true,
    },
  },
  { autoCreate: true }
);

const supplyChain = mongoose.model("supplyChain", supplyChainSchema);
module.exports = supplyChain;
