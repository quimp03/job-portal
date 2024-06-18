const express = require("express")
const router = express.Router()
const controller =require("../../controller/admin/statis.controller")
router.get("/", controller.statis)
module.exports = router