import request from "../utils/request";

//查询全部的课程数据
export const queryAllApi = () => {
  return request.get('/courses');
}

//新增课程数据
export const addApi = (course) => {
  return request.post('/courses',course);
}

//根据id查询课程数据
export const queryByIdApi = (id) => {
  return request.get(`/courses/${id}`);
}

//修改课程数据
export const updateApi = (course) => {
  return request.put('/courses',course);  
}

//删除课程数据
export const deleteByIdApi = (id) => {
  return request.delete(`/courses?id=${id}`);  
}