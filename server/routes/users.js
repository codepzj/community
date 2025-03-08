const express = require("express");
const upload = require("../middleware/multer");
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
router.post("/uploadAvatar", upload.single("file"), UploadUserAvatar);
module.exports = router;
