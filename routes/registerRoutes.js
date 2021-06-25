const express = require("express");
const router = express.Router();

//Controllers
const Register = require("../controller/registerController");

//Routes
router.post("/add", Register.createNewUser);

module.exports = router;
