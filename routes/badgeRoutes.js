const express = require("express");
const router = express.Router();

//Controllers
const Badges = require("../controller/badgesController");

//Badge
//Retrive
router.get("/get", Badges.getAllBadges);

// adding badges
// router.post('/add',Badges.createBadges);

module.exports = router;
