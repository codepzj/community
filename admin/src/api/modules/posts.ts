import type { PostsReq, PostsVO } from "@/api/interfaces/posts";
import type { Response } from "@/api/interfaces/resp";
import request from "@/utils/request";
export const createPost: (data: PostsReq) => Promise<Response<any>> = (
  data
) => {
  console.log("data", data);
  return request.post("/announcement/create", data);
};

// 获取公告列表
export const getAllPosts: () => Promise<Response<PostsVO[]>> = () => {
  return request.get("/announcement/findAll");
};

// 更新文章状态
export const updatePostById: (
  id: number,
  data: PostsReq
) => Promise<Response<any>> = (id, data) => {
  return request.put(`/announcement/update/${id}`, data);
};

// 删除文章
export const deletePostById: (id: number) => Promise<Response<any>> = (id) => {
  return request.delete(`/announcement/delete/${id}`);
};
