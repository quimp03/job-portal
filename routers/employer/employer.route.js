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
router.get("/manage-posted/:id", controller.managePosted)
router.post("/applied/add/:idUser/:idApplicant", controller.appliedPost)
router.delete("/deleted/:id", controller.deletedCv)
router.patch("/change-status/:status/:id",controller.changeStatusPatch)
router.get("/detail-cv/:id", controller.detailCv)


router.get("/password/forgot", controller.forgotPassword)
router.post("/password/forgot", controller.forgotPasswordPost)
router.get("/password/otp", controller.otpPassword)
router.post("/password/otp", controller.otpPasswordPost)
router.get("/password/reset", controller.resetPassword)
router.post("/password/reset", controller.resetPasswordPost)
module.exports = router;