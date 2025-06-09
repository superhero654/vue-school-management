import request from "../utils/request";

//查询职工列表数据
export const queryPageApi = (name,gender,begin,end,page,pageSize) =>{
    return request.get(`/emps?name=${name}&gender=${gender}&begin=${begin}&end=${end}&page=${page}&pageSize=${pageSize}`);
}

//根据id查询职工数据
export const queryInfoApi = (id) => {
  return request.get(`/emps/${id}`);
}