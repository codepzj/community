const express = require("express");
const router = express.Router();
const postsController = require("../controller/posts");

router.post("/create", postsController.createPost);
router.get("/get", postsController.getPosts);

module.exports = router;