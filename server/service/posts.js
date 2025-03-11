const { PostsModel } = require("../database");

class PostsService {
  async createPost(post) {
    try {
      return PostsModel.create(post);
    } catch (error) {
      throw new Error(error);
    }
  }
  async getPosts() {
    try {
      return PostsModel.findAll({
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new PostsService();
