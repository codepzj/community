import request from "@/utils/request";

// 获取帖子列表
export const getPostsList = () => request.get("/announcement/findAll");

// 获取帖子详情
export const getPostsDetail = (id) => request.get(`/announcement/find/${id}`);
