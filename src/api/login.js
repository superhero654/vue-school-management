import request from "../utils/request";

//登录
export const stuLoginApi = (user) => {
  return request.post('/student/login', user);
}

export const adminLoginApi = (user) => {
  return request.post('/admin/login', user);
}