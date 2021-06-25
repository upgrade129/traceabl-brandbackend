const express = require("express");
const router = express.Router();

//Controllers
const Home = require("../controller/homeController");

//Routes
router.get("/count/:brand_id", Home.getcountdetails);

module.exports = router;
