export interface paymentReq {
  resident_id: number;
  water_fee: number;
  electricity_fee: number;
  property_fee: number;
}

export interface paymentVO{
  id: number;
  resident_id: number;
  water_fee: number;
  electricity_fee: number;
  property_fee: number;
  total_amount: number;
  payment_status: string;
  createdAt: string;
  updatedAt: string;
}