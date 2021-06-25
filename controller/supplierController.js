const createError = require("http-errors");
const mongoose = require("mongoose");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const Supplier = require("../models/supplierModel");
const SuppImage = require("../models/suppimageModel");
const SuppCert = require("../models/suppcertModel");

module.exports = {
  creatNewSupplier: async (req, res, next) => {
    try {
      console.log("request for supplier add");
      if (!req.body) {
        return res.status(400).send({ message: "Supplier content is empty" });
      }
      const supplier = new Supplier({
        brand_id: req.body.brand_id,
        brand_email: req.body.brand_email,
        brand_name: req.body.brand_name,
        email: req.body.email,
        name_sup: req.body.name_sup,
        type: req.body.type,
        name_poc: req.body.name_poc,
        terms_and_conditions: req.body.terms_and_conditions,
        traceable_status: req.body.traceable_status,
        production_status: req.body.production_status,
        batch_id: req.body.batch_id,
        location: req.body.location,
        services: req.body.services,
        image: req.body.image,
      });
      supplier
        .save()
        .then((result) => {
          console.log(result);
          const response = {
            status: "success",
            data: result,
          };
          const msg = {
            to: req.body.email, // Change to your recipient
            from: "swapnali@traceabl.io", // Change to your verified sender
            subject: "Invitation to Join Traceable Platform",
            text: "Please accept the invitation",
            html: '<Button><a href="https://c679b939d312.ngrok.io/suppliers">Accept Invitation</a></Button>',
          };
          sgMail
            .send(msg)
            .then((result) => {
              console.log("Email sent to supplier");
              res.send(result);
            })
            .catch((error) => {
              console.error(error);
            });
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
      next(error);
    }
  },

  getAllByBrand: async (req, res, next) => {
    try {
      Supplier.find({ brand_id: req.params.brand_id })
        .then((suppliers) => {
          const response = {
            status: "success",
            data: suppliers,
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
      next(error);
    }
  },

  getImgByEmail: async (req, res, next) => {
    try {
      SuppImage.find({ supp_email: req.params.supp_email }, { images: 1 })
        .then((suppImages) => {
          const response = {
            status: "success",
            data: suppImages,
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
      next(error);
    }
  },

  getCertByEmail: async (req, res, next) => {
    try {
      SuppCert.find({ supp_email: req.params.supp_email }, { certs: 1 })
        .then((suppCerts) => {
          const response = {
            status: "success",
            data: suppCerts,
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
      next(error);
    }
  },

  updateById: async (req, res, next) => {
    try {
      if (!req.body) {
        return res.status(400).send({
          message: "supplier content can not be empty",
        });
      }
      Supplier.findByIdAndUpdate(
        req.body.id,
        {
          brand_id: req.body.brand_id,
          brand_email: req.body.brand_email,
          brand_name: req.body.brand_name,
          email: req.body.email,
          name_sup: req.body.name_sup,
          type: req.body.type,
          name_poc: req.body.name_poc,
          terms_and_conditions: req.body.terms_and_conditions,
          traceable_status: req.body.traceable_status,
          production_status: req.body.production_status,
          batch_id: req.body.batch_id,
          location: req.body.location,
          services: req.body.services,
          image: req.body.image,
        },
        { new: true }
      )
        .then((supplier) => {
          if (!supplier) {
            return res.status(404).send({
              status: "fail",
              data: "supplier not found with id " + req.body.id,
            });
          }
          res.send(supplier);
        })
        .catch((err) => {
          if (err.kind === "ObjectId") {
            return res.status(404).send({
              status: "fail",
              data: "supplier not found with id " + req.body.id,
            });
          }
          return res.status(500).send({
            status: "fail",
            data: "Error updating supplier with id " + req.body.id,
          });
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

  deletesupplier: async (req, res, next) => {
    try {
      Supplier.findByIdAndRemove(req.params.supp_id)
        .then((supplier) => {
          if (!supplier) {
            return res.status(404).send({
              status: "fail",
              data: "supplier not found with id " + req.params.id,
            });
          }
          res.send({ message: "supplier deleted successfully!" });
        })
        .catch((err) => {
          if (err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).send({
              status: "fail",
              data: "supplier not found with id " + req.params.id,
            });
          }
          return res.status(500).send({
            status: "fail",
            data: "Could not delete supplier with id " + req.params.id,
          });
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

  getAllSuppliers: async (req, res, next) => {
    try {
      Supplier.find()
        .then((suppliers) => {
          const response = {
            status: "success",
            data: suppliers,
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
      next(error);
    }
  },
};
