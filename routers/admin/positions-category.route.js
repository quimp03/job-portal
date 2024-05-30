const express = require("express")
const multer  = require('multer')
const route = express.Router()
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
const upload = multer()
const controller = require("../../controller/admin/positions-category.controller")
route.get("/", controller.index)
route.get("/create", controller.create)
route.post(
    "/create",
    upload.single('thumbnail'),
    uploadCloud.uploadSingle,
    controller.createPost)
route.patch("/change-status/:status/:id", controller.changeStatusPositionCategory)
route.delete("/delete-category/:id", controller.deletePositionCategory)
route.get("/detail/:id", controller.detailPositionCategory)
route.get("/edit/:id", controller.editPositionCatgory)
route.patch("/edit/:id", upload.single('thumbnail'), uploadCloud.uploadSingle, controller.editPatchPositionCategory)
module.exports = route