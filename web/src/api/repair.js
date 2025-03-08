import request from "@/utils/request";

export const createRepair = (data) => {
  return request({
    url: "/repair/create",
    method: "post",
    data,
  });
};

export const updateRepair = (data) => {
  return request({
    url: "/repair/update",
    method: "put",
    data,
  });
};

export const getRepairListByUserId = (userId) => {
  return request({
    url: `/repair/list/${userId}`,
    method: "get",
  });
};

export const getRepairListInPayByUserId = (userId) => {
  return request({
    url: `/repair/list/${userId}/in_pay`,
    method: "get",
  });
};

