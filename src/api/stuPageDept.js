import request from "../utils/request";

//查询全部的部门数据
export const queryAllApi = () => {
  return request.get('/depts');
}