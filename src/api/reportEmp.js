import request from "../utils/request";

//统计各个职位职工的人数
export const queryEmpJobDataApi = () => request.get(`/report/empJobData`)

//统计职工性别信息
export const queryEmpGenderDataApi = () => request.get(`/report/empGenderData`)