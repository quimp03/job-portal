const express = require("express");
const router = express.Router();
const controller = require("../../controller/candidate/home.controller.js")
router.get("/dashboard", controller.index)
module.exports = router;