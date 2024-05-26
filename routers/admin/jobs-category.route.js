const express = require("express")
const multer  = require('multer')
const route = express.Router()
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
const upload = multer()
const controller = require("../../controller/admin/jobs-category.controller")
route.get("/", controller.index)
route.get("/create", controller.create)
route.post(
    "/create",
    upload.single('thumbnail'),
    uploadCloud.uploadSingle,
    controller.createPost)
route.patch("/change-status/:status/:id", controller.changeStatusJobscategory)
route.delete("/delete-category/:id", controller.deleteCategory)
route.get("/detail/:id", controller.detailCategory)
route.get("/edit/:id", controller.edit)
route.patch("/edit/:id", upload.single('thumbnail'), uploadCloud.uploadSingle, controller.editPatchCategory)
module.exports = route