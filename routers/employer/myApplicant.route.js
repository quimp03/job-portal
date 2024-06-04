const express = require("express")
const router = express.Router()
const controller = require("../../controller/employer/myApplicant.controller")
router.post("/create", controller.createPost)
module.exports = router