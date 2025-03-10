export interface RepairTypeVO {
  id: number;
  name: string;
  price: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddRepairTypeReq {
  name: string;
  price: number;
}

export interface UpdateRepairTypeReq {
  id?: number;
  name: string;
  price: number;
}
