const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");
const goodsController = require("../controller/goods");
const repairController = require("../controller/repair");
const superAdminController = require("../controller/super_admin");
router.get("/user/findAll", adminController.findAllUsers);
router.put("/user/update", adminController.updateUser);
router.delete("/user/delete/:id", adminController.deleteUserById);

router.post("/goods/create", goodsController.createGoods);
router.put("/goods/update/:id", goodsController.updateGoods);
router.delete("/goods/delete/:id", goodsController.deleteGoods);

router.put("/repair/update/:id", repairController.updateRepairStatus);
router.get("/repair/pending", repairController.getRepairPending);

router.post("/super/create", superAdminController.createSuperAdmin);
router.put("/super/update/:id", superAdminController.updateSuperAdmin);
router.delete("/super/delete/:id", superAdminController.deleteSuperAdmin);
router.get("/super/findAll", superAdminController.findAllSuperAdmin);
router.post("/super/isExist", superAdminController.findSuperAdminIsExist);
module.exports = router;