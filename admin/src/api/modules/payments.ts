import request from "@/utils/request";
import type { paymentReq,paymentVO } from "../interfaces/payments";
import type { Response } from "@/api/interfaces/resp";

export const createPayment: (data: paymentReq) => Promise<any> = (data) => {
  return request.post("/admin/payments/create", data);
};

export const getPaymentList: () => Promise<Response<paymentVO[]>> = () => {
  return request.get("/admin/payments/findAll");
};

