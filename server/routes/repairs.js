const express = require("express");
const router = express.Router();
const repairController = require("../controller/repair");

router.post("/create", repairController.createRepair);
router.get("/list/:user_id", repairController.getRepairByUserId);
router.get("/list/:user_id/pending", repairController.getRepairPendingByUserId);
router.put("/update", repairController.updateRepair);
router.delete("/delete/:id", repairController.deleteRepairById);
router.get("/all/:user_id", repairController.findAllRepairByUserId);
module.exports = router;
