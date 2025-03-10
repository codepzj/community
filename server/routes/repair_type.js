const express = require("express");
const router = express.Router();
const repairTypeController = require("../controller/repair_type");

router.post("/create", repairTypeController.createRepairType);
router.get("/all", repairTypeController.getAllRepairType);
router.put("/update/:id", repairTypeController.updateRepairType);
router.delete("/delete/:id", repairTypeController.deleteRepairType);

module.exports = router;
