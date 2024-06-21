const express = require("express")
const router = express.Router()
const multer = require("multer")
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
const upload = multer()
const controller =require("../../controller/admin/general.controller")
router.get("/general", controller.general)
router.patch("/general",
    upload.single('banner'),
    uploadCloud.uploadSingle,
    controller.generalPatch    
)
module.exports = router