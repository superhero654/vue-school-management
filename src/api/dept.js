import request from "../utils/request";

//查询全部的部门数据
export const queryAllApi = () => {
  return request.get('/depts');
}

//新增部门数据
export const addApi = (dept) => {
  return request.post('/depts',dept);
}

//根据id查询部门数据
export const queryByIdApi = (id) => {
  return request.get(`/depts/${id}`);
}

//修改部门数据
export const updateApi = (dept) => {
  return request.put('/depts',dept);  
}

//删除部门数据
export const deleteByIdApi = (id) => {
  return request.delete(`/depts?id=${id}`);  
}