const express = require("express");
const router = express.Router();
const multer = require("multer")
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
const upload = multer()
const uploadSingle = require("../../middlewares/admin/uploadCloud.middleware")
const controller = require("../../controller/employer/employer.controller")
router.get("/register", controller.register)
router.post("/register", controller.registerPost)
router.get("/login", controller.login)
router.post("/login", controller.loginPost)
router.get("/applicant/create",
    controller.createApplicant 
)
router.post("/applicant/create",
    upload.single('thumbnail'),
    uploadCloud.uploadSingle,
    controller.createApplicantPost
)
router.get("/logout", controller.logout)
router.get("/myPosted",controller.myPosted)
router.delete("/myPosted/delete/:id", controller.myPostedDelete)
router.get("/manage-posted", controller.managePosted)
module.exports = router;