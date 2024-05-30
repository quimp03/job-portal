const express = require("express")
const router = express.Router()
const multer = require("multer")
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
const upload = multer()
const controller = require("../../controller/employer/applicant.controller")
const uploadSingle = require("../../middlewares/admin/uploadCloud.middleware")
router.get("/create", controller.crateApplicant)
router.post("/create",
    upload.single('thumbnail'),
    uploadCloud.uploadSingle,
    controller.createPostApplicant)
router.get("/myApplicant", controller.myApplicant)
module.exports = router