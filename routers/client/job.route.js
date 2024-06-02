const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/job.controller")
router.get("/", controller.index)
router.get("/:slugJobsCategory", controller.jobsCategory)
router.get("/detail/:id", controller.detailJob)
module.exports = router;