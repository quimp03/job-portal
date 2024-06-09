const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/candidate.controller")
router.get("/register", controller.register)
router.post("/register", controller.registerPost);
router.get("/login", controller.login)
router.post("/login", controller.loginPost)
router.get("/logout",controller.logout)
router.get("/password/forgot", controller.forgotPassword)
router.post("/password/forgot", controller.forgotPasswordPost)
router.get("/password/otp", controller.otpPassword)
router.post("/password/otp", controller.otpPasswordPost)
router.get("/password/reset", controller.resetPassword)
router.post("/password/reset", controller.resetPasswordPost)
router.get("/profile", controller.profileCandidate)
router.post("/profile", controller.profilePost)
router.get("/detail-profile", controller.detailProfile)
module.exports = router;