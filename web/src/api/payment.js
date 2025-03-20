import request from "@/utils/request";

export const getPaymentListByResidentId = (residentId) => {
  return request.get(`/admin/payments/findById/${residentId}`);
};

export const updatePaymentStatusById = (id) => {
  return request.patch(`/payment/update/${id}`);
};