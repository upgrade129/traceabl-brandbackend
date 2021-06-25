const express = require("express");
const router = express.Router();

//Controllers
const Login = require("../controller/loginController");

//Routes
router.post("/add", Login.LoginUser);

module.exports = router;
