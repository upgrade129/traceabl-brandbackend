const createError = require("http-errors");
const mongoose = require("mongoose");

const Badges = require("../models/badgesModel");
const Product = require("../models/productModel");
const Supplier = require("../models/supplierModel");

module.exports = {
  getCountBadges: async (req, res, nex) => {
    try {
      Badges.count({}, function (err, result) {
        if (err) {
          const response = {
            status: "fail",
            data: err.message,
          };
          res.send(response);
          console.log(err.message);
        } else {
          const response = {
            status: "success",
            data: result,
          };
          res.send(response);
          // res.json("Number of documents in the collection: " + result);
        }
      });
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  getCountProducts: async (req, res, nex) => {
    try {
      Products.count({}, function (err, result) {
        if (err) {
          const response = {
            status: "fail",
            data: err.message,
          };
          res.send(response);
          console.log(err.message);
        } else {
          const response = {
            status: "success",
            data: result,
          };
          res.send(response);
          //res.json("Number of documents in the Products: " + result);
        }
      });
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  getCountSuppliers: async (req, res, next) => {
    try {
      Supplier.count({}, function (err, result) {
        if (err) {
          const response = {
            status: "fail",
            data: err.message,
          };
          res.send(response);
          console.log(err.message);
        } else {
          const response = {
            status: "success",
            data: result,
          };
          res.send(response);
          //res.json("Number of documents in the Products: " + result);
        }
      });
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
