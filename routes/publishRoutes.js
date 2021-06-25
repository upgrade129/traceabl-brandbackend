const express = require('express');
const router = express.Router();

//Controllers
const Publish = require('../controller/publishController');

//Routes

//health check 
router.get('/',(req,res)=>{res.send("checking the route")})

//get suppliers_id using batch_is
router.get('/getsuppliers/:batch_id', Publish.getSuppliers);

//get the supplier details and images by using supplier_id 
router.post('/suppdetail', Publish.getSupplierDetail);

//create publish details
router.post('/pubblishDetails', Publish.createpublishDetails);

//edit publish details
router.post('/updatepublishDetails', Publish.editpublishDetails);

//get the publish details using brand_id and batch_id
router.get('/getpublishdetails/:brand_id/:batch_id', Publish.getpublishDetails)

module.exports = router; 