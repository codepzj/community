import request from "@/utils/request";

export const LoginAPI = (user) => {
  return request.post("/user/login", user);
};

export const RegisterAPI = (user) => {
  return request.post("/user/create", user);
};

export const UpdateUserAPI = (user) => {
  return request.put("/user/update", user);
};
