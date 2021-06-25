const express = require("express");
const router = express.Router();

//Controllers
const Supplier = require("../controller/supplierController");

//Suppliers
//Add a new supplier
router.post("/add", Supplier.creatNewSupplier);

//update supplier
router.post("/update", Supplier.updateById);

//delete supplier
router.delete("/delete/:supp_id", Supplier.deletesupplier);

//Get all suppliers
router.get("/getall", Supplier.getAllSuppliers);

//get supplliers using brand id
router.get("/getallbybrand/:brand_id", Supplier.getAllByBrand);

//get supplier image by their email id
router.get("/getimgbyemail/:supp_email", Supplier.getImgByEmail);

//get supplier image by their email id
router.get("/getcertbyemail/:supp_email", Supplier.getCertByEmail);

module.exports = router;
