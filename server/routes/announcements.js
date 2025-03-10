const express = require("express");
const router = express.Router();
const announcementsController = require("../controller/announcements");

router.get("/findAll", announcementsController.findAllAnnouncements);
router.get("/find/:id", announcementsController.findAnnouncementById);
router.post("/create", announcementsController.createAnnouncement);
router.put("/update/:id", announcementsController.updateAnnouncement);
router.delete("/delete/:id", announcementsController.deleteAnnouncement);

module.exports = router;