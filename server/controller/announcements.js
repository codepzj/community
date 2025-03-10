const announcementsService = require("../service/announcements");
const { success, failOnServer } = require("../utils/wrap");

class AnnouncementsController {
  async findAllAnnouncements(req, res) {
    try {
      const announcements = await announcementsService.findAllAnnouncements();
      res.json(success("获取所有公告成功", announcements));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }

  async findAnnouncementById(req, res) {
    try {
      const announcement = await announcementsService.findAnnouncementById(
        req.params.id
      );
      res.json(success("获取公告成功", announcement));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }

  async createAnnouncement(req, res) {
    try {
      const announcement = await announcementsService.createAnnouncement(
        req.body
      );
      res.json(success("创建公告成功", announcement));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }

  async updateAnnouncement(req, res) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const announcement = await announcementsService.updateAnnouncement({
        id,
        title,
        content,
      });
      res.json(success("更新公告成功", announcement));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }

  async deleteAnnouncement(req, res) {
    try {
      const announcement = await announcementsService.deleteAnnouncement(
        req.params.id
      );
      res.json(success("删除公告成功", announcement));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }
}
module.exports = new AnnouncementsController();
