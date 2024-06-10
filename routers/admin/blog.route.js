const express = require("express")
const router = express.Router()
const controller = require("../../controller/admin/blog.controller")
const multer = require("multer")
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
const upload = multer()
const uploadSingle = require("../../middlewares/admin/uploadCloud.middleware")
router.get("/", controller.index)
router.get("/create", controller.create)
router.post("/create", 
    upload.single('thumbnail'),
    uploadCloud.uploadSingle,
    controller.createPost)
router.patch("/change-status/:status/:id", controller.changeStatusPatch)
router.delete("/delete-blog/:id", controller.deleteBlog)
router.get("/detail/:id", controller.detailBlog)
router.get("/edit/:id", controller.editBlog)
router.patch("/edit/:id",
    upload.single('thumbnail'),
    uploadCloud.uploadSingle,
    controller.editPatch)
module.exports = router