const createError = require("http-errors");
const Product = require("../models/productModel");
const SupplyChain = require("../models/supplyModel");
const Supplier = require("../models/supplierModel");

module.exports = {
  getcountdetails: async (req, res, next) => {
    console.log("get by brandid ", req.params.brand_id);
    try {
      var prod_count = await Product.count({ brand_id: req.params.brand_id });
      var supp_count = await Supplier.count({ brand_id: req.params.brand_id });
      var supplyChain_count = await SupplyChain.count({
        brand_id: req.params.brand_id,
      });

      var response = {
        prod_count: prod_count,
        supp_count: supp_count,
        supply_chain: supplyChain_count,
      };
      res.send(response);
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },
};
