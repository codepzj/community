const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");

router.get("/user/findAll", adminController.findAllUsers);
router.put("/user/update", adminController.updateUser);
router.delete("/user/delete/:id", adminController.deleteUserById);

module.exports = router;