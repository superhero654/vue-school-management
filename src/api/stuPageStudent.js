import request from "../utils/request";
//查询个人信息
export const queryMyApi = () => {
  return request.get('/stuStudents/getMy');
}

//查询个人成绩
export const queryScoreApi = () => {
  return request.get('/stuStudents/getScore');
}