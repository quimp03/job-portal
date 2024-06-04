const express = require("express");
const router = express.Router();
const controller = require("../../controller/candidate/home.controller.js")
router.get("/dashboard", controller.index)
router.get("/logout",controller.logout)
module.exports = router;