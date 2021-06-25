const createError = require("http-errors");
const mongoose = require("mongoose");

const SupplyChain = require("../models/supplyModel");
const Supplier = require("../models/supplierModel");
const Image = require("../models/suppimageModel");
const Publish = require("../models/publishModel");

module.exports = {
  getSuppliers: async (req, res) => {
    try {
      console.log("batch_id", req.params.batch_id);
      SupplyChain.find({ batch_id: req.params.batch_id })
        .then((SC) => {
          const response = {
            status: "success",
            data: SC,
          };
          res.send(response);
        })
        .catch((err) => {
          const response = {
            status: "fail",
            data: err.message,
          };
          res.send(response);
          console.log(err.message);
        });
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
    }
  },

  getSupplierDetail: async (req, res) => {
    try {
      var response = [];
      Supplier.find({ _id: req.body.supplier_id })
        .then((SC) => {
          response = {
            status: "success",
            data: SC,
          };
          Image.find({ supp_id: req.body.supplier_id })
            .then((SI) => {
              response["imgurl"] = SI;
              //const a3 = a1.map(t1 => ({...t1, ...a2.find(t2 => t2.id === t1.id)}))
              res.send(response);
            })
            .catch((err) => {
              console.log(err.message);
            });
        })
        .catch((err) => {
          const response = {
            status: "fail",
            data: err.message,
          };
          res.send(response);
          console.log(err.message);
        });
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
    }
  },

  createpublishDetails: async (req, res) => {
    try {
      const publish = new Publish({
        publishdetails: req.body.publishdetails,
        batch_id: req.body.batch_id,
        prod_details: req.body.prod_details,
        brand_id: req.body.brand_id,
      });
      publish
        .save()
        .then((result) => {
          const response = {
            status: "success",
            data: result,
          };
          res.send(response);
        })
        .catch((err) => {
          const response = {
            status: "fail",
            data: err.message,
          };
        });
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
    }
  },

  editpublishDetails: async (req, res) => {
    try {
      Publish.findByIdAndUpdate(
        req.body.publish_id,
        {
          publishdetails: req.body.publishdetails,
          batch_id: req.body.batch_id,
          prod_details: req.body.prod_details,
          brand_id: req.body.brand_id,
        },
        { new: true }
      )
        .then((publishdetails) => {
          res.send("edited");
          //res.send(publishdetails);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
    }
  },

  getpublishDetails: async (req, res) => {
    try {
      Publish.find({
        brand_id: req.params.brand_id,
        batch_id: req.params.batch_id,
      })
        .then((publishdetails) => {
          res.send(publishdetails);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
    }
  },
};
