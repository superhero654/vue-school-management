import request from "../utils/request";

//查询成绩列表数据
export const queryPageApi = (studentName,courseName,teacherName,min,max,page,pageSize) =>{
    return request.get(`/score?studentName=${studentName}&courseName=${courseName}&teacherName=${teacherName}&min=${min}&max=${max}&page=${page}&pageSize=${pageSize}`);
}
//新增成绩
export const addApi = (score) => {
  return request.post('/score',score);
}

//根据id查询成绩数据
export const queryInfoApi = (id) => {
  return request.get(`/score/${id}`);
}

//修改成绩数据
export const updateApi = (score) => {
  return request.put('/score',score);  
}

//删除成绩数据
export const deleteApi = (ids) => {
  return request.delete(`/score?ids=${ids}`);  
}