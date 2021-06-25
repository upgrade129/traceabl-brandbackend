const express = require("express");
const router = express.Router();

//Controllers
const Product = require("../controller/productController");
const Dashbord = require("../controller/dashboardController");

//Routes
//Products
//Add new product
router.post("/add", Product.createNewProduct);

//Get all products
router.get("/getall", Product.getAllProducts);

//get all products of a particular brand using brand_id
router.get("/getallbybrand/:brand_id", Product.gettAllByBrand);

//Get product details using batch id
router.get("/getProductById/:batchId", Product.findProductById);

//edit (or) update a product by id
router.post("/updateprod", Product.editProduct);

//delete a product by id
router.delete("/delete/:productId", Product.deleteProduct);

//supplychain
router.post("/supplychain", Product.createSupplyChain);

//supplychain
router.get("/getProdID", Product.getSupply_Batch_id);

router.get("/supplychainById/:batchId", Product.findChainById);

//add product image
router.post("/uploadimg", Product.uploadImg);

//get product images
router.get("/getimg", Product.getImg);

//delete img by id
router.delete("/deleteimg/:imgId", Product.deleteImg);

//upload bom
router.post("/uploadbom", Product.uploadBom);

//upload tech pack data
router.post("/uploadtp", Product.uploadtp);

//addSupplyChainStages
// router.post('/addStages', Product.stagesData);

//check for tesing badgesCount
// router.get('/showbadge',Dashbord.getCountBadges);

module.exports = router;
