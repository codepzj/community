const express = require("express");
const router = express.Router();
const repairTypeController = require("../controller/repair_type");

router.post("/create", repairTypeController.createRepairType);
router.get("/all", repairTypeController.getAllRepairType);

module.exports = router;
