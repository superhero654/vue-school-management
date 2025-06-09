import request from "../utils/request";

//查询教师列表数据
export const queryPageApi = (name,gender,begin,end,page,pageSize) =>{
    return request.get(`/teachers?name=${name}&gender=${gender}&begin=${begin}&end=${end}&page=${page}&pageSize=${pageSize}`);
}
//新增教师
export const addApi = (teacher) => {
  return request.post('/teachers',teacher);
}

//根据id查询教师数据
export const queryInfoApi = (id) => {
  return request.get(`/teachers/${id}`);
}

//修改教师数据
export const updateApi = (teacher) => {
  return request.put('/teachers',teacher);  
}

//删除教师数据
export const deleteApi = (ids) => {
  return request.delete(`/teachers?ids=${ids}`);  
}

//根据姓名查询教师数据
export const queryByNameApi = (name) => {
  return request.get(`/teachers/name/${name}`); 
}