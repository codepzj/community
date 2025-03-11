export interface GoodsVO {
  image: string;
  type_id: number;
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface AddGoodsReq {
  name: string;
  price: number;
  description: string;
  image: string;
  type_id: number;
}

export interface UpdateGoodsReq {
  id?: number;
  name: string;
  price: number;
  description: string;
  image: string;
  type_id: number;
}
