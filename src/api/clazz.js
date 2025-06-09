import request from "../utils/request";

//查询全部的班级数据
export const queryAllApi = () => {
  return request.get('/clazzs');
}

//新增班级数据
export const addApi = (clazz) => {
  return request.post('/clazzs',clazz);
}

//根据id查询班级数据
export const queryByIdApi = (id) => {
  return request.get(`/clazzs/${id}`);
}

//修改班级数据
export const updateApi = (clazz) => {
  return request.put('/clazzs',clazz);  
}

//删除班级数据
export const deleteByIdApi = (id) => {
  return request.delete(`/clazzs?id=${id}`);  
}