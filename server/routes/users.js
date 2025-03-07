const express = require("express");
const router = express.Router();

const {
  createUser,
  findUserIsExist,
  updateUser,
  UploadUserAvatar,
} = require("../controller/user");

router.post("/create", createUser);
router.post("/login", findUserIsExist);
router.put("/update", updateUser);
router.post("/uploadAvatar", UploadUserAvatar);
module.exports = router;
