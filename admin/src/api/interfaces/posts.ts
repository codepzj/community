export interface PostsReq {
  id?: number;
  title: string;
  content: string;
}

export interface PostsVO {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
}
