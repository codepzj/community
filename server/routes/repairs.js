const express = require("express");
const router = express.Router();
const repairController = require("../controller/repair");

router.post("/create", repairController.createRepair);
router.get("/list/:user_id", repairController.getRepairByUserId);
router.get("/list/:user_id/in_pay", repairController.getRepairInPayByUserId);
router.put("/update", repairController.updateRepair);
module.exports = router;
