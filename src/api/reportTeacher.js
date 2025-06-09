import request from "../utils/request";

//统计教师职位人数
export const queryTeacherTitleDataApi = () => request.get(`/report/teacherTitleData`)

//统计教师性别人数
export const queryTeacherGenderDataApi = () => request.get(`/report/teacherGenderData`)