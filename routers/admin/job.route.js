const express = require("express")
const router = express.Router()
const controller = require("../../controller/admin/job.controller")
router.get("/", controller.index)
router.patch("/change-status/:status/:id", controller.changeStatus)
router.patch("/change-multi", controller.changeMulti);
router.delete("/delete/:id", controller.deleteItem)
router.get("/detail/:id", controller.detailItem)
router.patch("/change-status-outstanding/:status/:id", controller.changeStatusOutstanding)
module.exports = router