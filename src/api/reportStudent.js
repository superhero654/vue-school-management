import request from "../utils/request";

//统计学生班级人数
export const queryStudentClazzDataApi = () => request.get(`/report/studentClazzData`)

//统计学生性别人数
export const queryStudentGenderDataApi = () => request.get(`/report/studentGenderData`)