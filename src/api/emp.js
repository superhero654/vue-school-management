import request from "../utils/request";

//查询职工列表数据
export const queryPageApi = (name,gender,begin,end,page,pageSize) =>{
    return request.get(`/emps?name=${name}&gender=${gender}&begin=${begin}&end=${end}&page=${page}&pageSize=${pageSize}`);
}
//新增职工
export const addApi = (emp) => {
  return request.post('/emps',emp);
}

//根据id查询职工数据
export const queryInfoApi = (id) => {
  return request.get(`/emps/${id}`);
}

//修改职工数据
export const updateApi = (emp) => {
  return request.put('/emps',emp);  
}

//删除职工数据
export const deleteApi = (ids) => {
  return request.delete(`/emps?ids=${ids}`);  
}