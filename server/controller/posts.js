const postsService = require("../service/posts");
const { success, failOnServer } = require("../utils/wrap");
class PostsController {
  async createPost(req, res) {
    try {
      const post = req.body;
      const newPost = await postsService.createPost(post);
      res.json(success("帖子创建成功", newPost));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }
  async getPosts(req, res) {
    try {
      const posts = await postsService.getPosts();
      res.json(success("帖子获取成功", posts));
    } catch (error) {
      res.json(failOnServer(error.message));
    }
  }
}

module.exports = new PostsController();
