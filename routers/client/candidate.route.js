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
module.exports = router;