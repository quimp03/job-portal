const express = require("express")
const router = express.Router()
const controller =require("../../controller/admin/myAccount.controlller")
router.get("/", controller.myAccount)
module.exports = router