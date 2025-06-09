import request from "../utils/request";

//查询教师列表数据
export const queryPageApi = (name,gender,begin,end,page,pageSize) =>{
    return request.get(`/teachers?name=${name}&gender=${gender}&begin=${begin}&end=${end}&page=${page}&pageSize=${pageSize}`);
}

//根据id查询教师数据
export const queryInfoApi = (id) => {
  return request.get(`/teachers/${id}`);
}