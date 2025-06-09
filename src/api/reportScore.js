import request from "../utils/request";

//统计学生排名信息
export const queryScoreRankDataApi = () => request.get(`/report/studentRankData`)

//统计每门课程的平均分
export const queryStudentAverageDataApi = () => request.get(`/report/studentAverageData`)