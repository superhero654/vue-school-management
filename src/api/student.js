import request from "../utils/request";

//查询学生列表数据
export const queryPageApi = (name,gender,begin,end,page,pageSize) =>{
    return request.get(`/students?name=${name}&gender=${gender}&begin=${begin}&end=${end}&page=${page}&pageSize=${pageSize}`);
}
//新增学生
export const addApi = (student) => {
  return request.post('/students',student);
}

//根据id查询学生数据
export const queryInfoApi = (id) => {
  return request.get(`/students/${id}`);
}

//修改学生数据
export const updateApi = (student) => {
  return request.put('/students',student);  
}

//删除学生数据
export const deleteApi = (ids) => {
  return request.delete(`/students?ids=${ids}`);  
}

//根据姓名查询学生数据
export const queryByNameApi = (name) => {
  return request.get(`/students/name/${name}`); 
}