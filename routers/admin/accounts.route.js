const express = require("express")
const router = express.Router()
const multer = require("multer")
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
const upload = multer()
const controller = require("../../controller/admin/accounts.controller")
const uploadSingle = require("../../middlewares/admin/uploadCloud.middleware")
const validate = require("../../validates/admin/account.validate");
router.get("/", controller.index)
router.get("/create", controller.createAccount)
router.post("/create", 
    upload.single('avatar'),
    uploadCloud.uploadSingle,
    validate.createPost,
    controller.createPost
)
router.patch("/change-status/:status/:id", controller.changeStatusPatch)
router.get("/detail/:id", controller.detailAccount)
router.delete("/delete/:id", controller.deleteAccount)
router.get("/edit/:id", controller.editAccount)
router.patch("/edit/:id",
    upload.single("avatar"), 
    uploadCloud.uploadSingle, 
    controller.editPatchAccount
)
module.exports = router