import request from "@/utils/request";

// 获取公告列表
export const getAnnounceMentList = () => request.get("/announcement/findAll");

// 获取公告详情
export const getAnnounceMentDetail = (id) =>
  request.get(`/announcement/find/${id}`);

// 发布论坛帖子
export const postPosts = (data) => request.post("/posts/create", data);

// 获取论坛帖子列表
export const getAllPostsList = () => request.get("/posts/get");
