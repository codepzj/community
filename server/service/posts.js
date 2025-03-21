const { PostsModel } = require("../database");
const { Op } = require("sequelize");
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
      // 获取所有帖子
      const allPosts = await PostsModel.findAll({
        order: [["createdAt", "DESC"]],
        raw: true, // 返回纯 JSON
      });

      // 构建帖子树
      const postMap = new Map();
      allPosts.forEach((post) => {
        post.list = [];
        postMap.set(post.id, post);
      });

      const rootPosts = [];

      allPosts.forEach((post) => {
        if (post.reply_id) {
          // 是回复，找到父级帖子并追加到 list
          const parent = postMap.get(post.reply_id);
          if (parent) {
            parent.list.push(post);
          }
        } else {
          // 是顶级帖子
          rootPosts.push(post);
        }
      });

      return rootPosts;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new PostsService();
