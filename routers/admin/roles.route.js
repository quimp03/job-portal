const express = require("express");
const router = express.Router();

const controller = require("../../controller/admin/roles.controller");

router.get("/", controller.index);
router.get("/create", controller.createRole)
router.post("/create", controller.createPost)
router.get("/detail/:id", controller.detail)
router.delete("/delete/:id", controller.deleteRole)
router.get("/edit/:id", controller.edit)
router.patch("/edit/:id", controller.editPatch)
router.get("/permissions", controller.permissions)
router.patch("/permissions", controller.editPathPermission)
module.exports = router;