const { AnnouncementsModel } = require("../database/index");

class AnnouncementsService {
  async findAllAnnouncements() {
    try {
      return await AnnouncementsModel.findAll({
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async findAnnouncementById(id) {
    try {
      return await AnnouncementsModel.findByPk(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async createAnnouncement(announcement) {
    try {
      return await AnnouncementsModel.create(announcement);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateAnnouncement(announcement) {
    try {
      return await AnnouncementsModel.update(announcement, {
        where: { id: announcement.id },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAnnouncement(announcementId) {
    try {
      return await AnnouncementsModel.destroy({
        where: { id: announcementId },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new AnnouncementsService();
