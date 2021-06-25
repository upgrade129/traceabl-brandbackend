const createError = require("http-errors");
const mongoose = require("mongoose");

const Product = require("../models/productModel");
const SupplyChain = require("../models/supplyModel");
const Stages = require("../models/stagesModel");
const UploadImg = require("../models/productImgModel");
const UploadBOM = require("../models/productBOMModel");
const UploadTp = require("../models/productTpModel");

const fs = require("fs");
const path_dir = require("path");

const multer = require("multer");

const cors = require("cors");

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./Productimg");
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 1000000, // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          "only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format."
        )
      );
    }
    cb(undefined, true); // continue with upload
  },
}).single("file");

const uploadBOM = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./Productbom");
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 1000000, // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          "only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format."
        )
      );
    }
    cb(undefined, true); // continue with upload
  },
}).single("file");

const uploadtpdata = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./Producttp");
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 1000000, // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          "only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format."
        )
      );
    }
    cb(undefined, true); // continue with upload
  },
}).single("file");

module.exports = {
  createNewProduct: async (req, res, next) => {
    //function to generate random numbers btw 1 to 100
    // function between(min, max) {
    //   return Math.floor(
    //     Math.random() * (max - min) + min
    //   )
    // }
    //function to generate string [a-zA-Z0-9]
    function makeSign(length) {
      var result = [];
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result.push(
          characters.charAt(Math.floor(Math.random() * charactersLength))
        );
      }
      return result.join("");
    }

    var count = 0;
    try {
      console.log("request body:", req.body);

      //
      const product = new Product({
        brand_id: req.body.brand_id,
        prod_name: req.body.prod_name,
        prod_code: req.body.prod_code,
        season: req.body.season,
        fabric_comp: req.body.fabric_comp,
        fabcomp1: req.body.fabcomp1,
        fabcomp2: req.body.fabcomp2,
        fabper1: req.body.fabper1,
        fabper2: req.body.fabper2,
        apparel_category: req.body.apparel_category,
        specification: req.body.specification,
        product_description: req.body.product_description,
        batch_id: req.body.batch_id,
        images: req.body.images,
        tech_packs: req.body.tech_packs,
        bom: req.body.bom,
        badges: req.body.badges,
        etho_coin: 12, //1 to 100
        signature: makeSign(10), //random string
        timestamp: req.body.timestamp,
        Date_last_updated: req.body.Date_last_updated,
        current_product_stage: req.body.current_product_stage,
        Filter_by_category: req.body.Filter_by_category,

      });

      product
        .save()
        .then((result) => {
          console.log(result);
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
    count = count++;
  },

  gettAllByBrand: async (req, res, nex) => {
    console.log("get by brandid ", req.params.brand_id);
    try {
      Product.find({ brand_id: req.params.brand_id })
        .then((products) => {
          const response = {
            status: "success",
            data: products,
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
          // res.status(500).send({
          //   message: err.message || "some error in retriving suppliers data"
          // })
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

  getAllProducts: async (req, res, nex) => {
    try {
      Product.find()
        .then((products) => {
          const response = {
            status: "success",
            data: products,
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
          // res.status(500).send({
          //   message: err.message || "some error in retriving suppliers data"
          // })
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

  editProduct: async (req, res, next) => {
    try {
      if (!req.body) {
        return res.status(400).send({
          message: "product content can not be empty",
        });
      }
      console.log("update product", req.body);
      Product.findByIdAndUpdate(
        req.body.productId,
        {
          brand_id: req.body.brand_id,
          prod_name: req.body.prod_name,
          prod_code: req.body.prod_code,
          season: req.body.season,
          fabric_comp: req.body.fabric_comp,
          fabcomp1: req.body.fabcomp1,
          fabcomp2: req.body.fabcomp2,
          fabper1: req.body.fabper1,
          fabper2: req.body.fabper2,
          apparel_category: req.body.apparel_category,
          specification: req.body.specification,
          product_description: req.body.product_description,
          batch_id: req.body.batch_id,
          images: req.body.images,
          tech_packs: req.body.tech_packs,
          bom: req.body.bom,
          badges: req.body.badges,
          etho_coin: 12, //1 to 100
          timestamp: req.body.timestamp,
          Date_last_updated: req.body.Date_last_updated,
          current_product_stage: req.body.current_product_stage,
          Filter_by_category: req.body.Filter_by_category,
        },
        { new: true }
      )
        .then((product) => {
          if (!product) {
            return res.status(404).send({
              status: "fail",
              data: "product not found with id " + req.params.productId,
            });
          }
          res.send(product);
        })
        .catch((err) => {
          if (err.kind === "ObjectId") {
            return res.status(404).send({
              status: "fail",
              data: "Product not found with id " + req.params.productId,
            });
          }
          return res.status(500).send({
            status: "fail",
            data: "Error updating product with id " + req.params.productId,
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

  deleteProduct: async (req, res, next) => {
    try {
      Product.findByIdAndRemove(req.params.productId)
        .then((product) => {
          if (!product) {
            return res.status(404).send({
              status: "fail",
              data: "product not found with id " + req.params.productId,
            });
          }
          res.send({ message: "product deleted successfully!" });
        })
        .catch((err) => {
          if (err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).send({
              status: "fail",
              data: "product not found with id " + req.params.productId,
            });
          }
          return res.status(500).send({
            status: "fail",
            data: "Could not delete product with id " + req.params.productId,
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

  findProductById: async (req, res, next) => {
    const batch_id = req.params.batchId;
    console.log("product id ", batch_id);
    try {
      //const product = await Product.findById(id);
      const product = await Product.findOne({ batch_id: req.params.batchId });
      if (!product) {
        const response = {
          status: "fail",
          data: "Product does not exist.",
        };
        res.send(response);
      } else {
        const response = {
          status: "success",
          data: product,
        };
        res.send(response);
      }
      //  res.send(product);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Product id"));
        return;
      }
      next(error);
    }
  },

  //supplyChain adding
  createSupplyChain: async (req, res, next) => {
    try {
      console.log("request body:", req.body);
      const supplyChain = new SupplyChain({
        supplier_id : req.body.supplier_id,
        brand_id: req.body.brand_id,
        batch_id: req.body.batch_id,
        stages: req.body.stages,
      });
      supplyChain
        .save()
        .then((result) => {
          console.log(result);
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

  //Product_Batch_id get
  getSupply_Batch_id: async (req, res, nex) => {
    try {
      var d;
      SupplyChain.find({}, "batch_id")
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
          // res.status(500).send({
          //   message: err.message || "some error in retriving suppliers data"
          // })
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

  findChainById: async (req, res, next) => {
    console.log(req.params.batchId);
    try {
      //const product = await Product.findById(id);
      const chain = await SupplyChain.findOne({ batch_id: req.params.batchId });
      if (!chain) {
        const response = {
          status: "fail",
          data: null,
        };
        res.send(response);
      } else {
        const response = {
          status: "success",
          data: chain,
        };
        res.send(response);
      }
      //  res.send(product);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Batch id"));
        return;
      }
      next(error);
    }
  },

  //upload image

  uploadImg: (req, res) => {
    upload(req, res, () => {
      try {
        console.log("batch_id", req.body.batch_id);
        if (req.file) {
          var { path, mimetype } = req.file;
          console.log("path", path);
          var new_path = path_dir.join(__dirname, "../");
          var file = new UploadImg({
            batch_id: req.body.batch_id,
            img: {
              data: fs.readFileSync(path_dir.join(new_path + path)),
              contentType: "image/png",
            },
          });
        } else {
          var file = new UploadImg({
            batch_id: req.body.batch_id,
            img: {
              data: "",
              contentType: "image/png",
            },
          });
        }

        file.save();
        res.send("file uploaded successfully.");
        console.log("file uploaded sucessfully");
      } catch (error) {
        res.status(400).send("Error while uploading file. Try again later.");
        console.log("error in uploading", error);
      }
    });
  },

  //upload BOM

  uploadBom: (req, res) => {
    uploadBOM(req, res, () => {
      try {
        console.log("batch_id", req.body.batch_id);
        if (req.file) {
          var { path, mimetype } = req.file;
          console.log("path", path);
          var new_path = path_dir.join(__dirname, "../");
          var file = new UploadBOM({
            batch_id: req.body.batch_id,
            bom: {
              data: fs.readFileSync(path_dir.join(new_path + path)),
              contentType: "image/png/pdf",
            },
          });
        } else {
          var file = new UploadBOM({
            batch_id: req.body.batch_id,
            bom: {
              data: "",
              contentType: "image/png/pdf",
            },
          });
        }

        file.save();
        res.send("file uploaded successfully.");
        console.log("file uploaded sucessfully");
      } catch (error) {
        res.status(400).send("Error while uploading file. Try again later.");
        console.log("error in uploading", error);
      }
    });
  },

  //upload tech packs

  uploadtp: (req, res) => {
    uploadtpdata(req, res, () => {
      try {
        console.log("batch_id", req.body.batch_id);
        if (req.file) {
          var { path, mimetype } = req.file;
          console.log("path", path);
          var new_path = path_dir.join(__dirname, "../");
          var file = new UploadTp({
            batch_id: req.body.batch_id,
            bom: {
              data: fs.readFileSync(path_dir.join(new_path + path)),
              contentType: "image/png/pdf",
            },
          });
        } else {
          var file = new UploadTp({
            batch_id: req.body.batch_id,
            bom: {
              data: "",
              contentType: "image/png/pdf",
            },
          });
        }

        file.save();
        res.send("file uploaded successfully.");
        console.log("file uploaded sucessfully");
      } catch (error) {
        res.status(400).send("Error while uploading file. Try again later.");
        console.log("error in uploading", error);
      }
    });
  },

  //get image data

  getImg: async (req, res, nex) => {
    try {
      UploadImg.find()
        .then((images) => {
          var resdata = [];
          images.map((imagedata) => {
            var data = imagedata.img.data;
            var bs64 = data.toString("base64");
            var batchdata = imagedata.batch_id;
            var _id = imagedata._id;
            var jsondata = {
              image: bs64,
              batch_id: batchdata,
              _id: _id,
            };
            resdata.push(jsondata);
          });
          const response = {
            status: "success",
            data: resdata,
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

  // delete image data

  deleteImg: async (req, res, next) => {
    try {
      if (!req.body) {
        return res.status(400).send({
          status: "fail",
          data: "product content can not be empty",
        });
      }
      UploadImg.findByIdAndRemove(req.params.imgId)
        .then((product) => {
          if (!product) {
            return res.status(404).send({
              status: "fail",
              data: "product not found with id " + req.params.imgId,
            });
          }
          res.send({ message: "product deleted successfully!" });
        })
        .catch((err) => {
          if (err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).send({
              status: "fail",
              data: "product not found with id " + req.params.imgId,
            });
          }
          return res.status(500).send({
            status: "fail",
            data: "Could not delete product with id " + req.params.imgId,
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
};

/*

'batch_id':1000,
[
  {"stage":1,"supplier1":"abc","supplier2":"pqr","timestamp":"54646"},
  {"stage":2,"supplier1":"abc","supplier2":"pqr","timestamp":"54646"},
  {"stage":3,"supplier1":"abc","supplier2":"pqr","timestamp":"54646"},
  {"stage":4,"supplier1":"abc","supplier2":"pqr","timestamp":"54646"},
  {"stage":5,"supplier1":"abc","supplier2":"pqr","timestamp":"54646"},
  {"stage":6,"supplier1":"abc","supplier2":"pqr","timestamp":"54646"}
]
*/

/*
​
echo `mongo --eval 'db.chainstages.insert( { stage_id:"1", stage_title:"Fabre" } );' brand`
echo `mongo --eval 'db.chainstages.insert( { stage_id:"2", stage_title:"Fabric" } );' brand`
echo `mongo --eval 'db.chainstages.insert( { stage_id:"3", stage_title:"Trims and Accessories" } );' brand`
echo `mongo --eval 'db.chainstages.insert( { stage_id:"4", stage_title:"Dyeing" } );' brand`
echo `mongo --eval 'db.chainstages.insert( { stage_id:"5", stage_title:"CMT" } );' brand`
echo `mongo --eval 'db.chainstages.insert( { stage_id:"6", stage_title:"Processing" } );' brand`
*/

// [
//   {"name":"Ram", "email":"ram@gmail.com", "age":23},
//   {"name":"Shyam", "email":"shyam23@gmail.com", "age":28},
//   {"name":"John", "email":"john@gmail.com", "age":33},
//   {"name":"Bob", "email":"bob32@gmail.com", "age":41}
// ]
