export interface Repair {
  id: number;
  user_id: number;
  type_id: number;
  name: string;
  phone: string;
  region: string;
  address: string;
  report_date: string;
  description: string;
  status: string;
}

export interface UpdateRepairStatusReq {
  status: "pending" | "in_progress" | "completed";
}
