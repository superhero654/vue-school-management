import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/index/index.vue'
import ClazzView from '@/views/clazz/index.vue'
import DeptView from '@/views/dept/index.vue'
import EmpView from '@/views/emp/index.vue'
import LoginView from '@/views/login/index.vue'
import CourseView from '@/views/course/index.vue'
import TeacherView from '@/views/teacher/index.vue'
import ScoreView from '@/views/score/index.vue'
import EmpReportView from '@/views/report/emp/index.vue'
import StuReportView from '@/views/report/stu/index.vue'
import StudentView from '@/views/student/index.vue'
import LayoutView from '@/views/layout/index.vue'
import TeacherReportView from '@/views/report/teacher/index.vue'
import ScoreReport from '@/views/report/score/index.vue'
import StuLayoutView from '@/views/stuLayout/index.vue'
import StuIndexView from '@/views/stuIndex/index.vue'
import StuCourseView from '@/views/stuPageCourse/index.vue'
import StuDeptView from '@/views/stuPageDept/index.vue'
import StuEmpView from '@/views/stuPageEmp/index.vue'
import StuScoreView from '@/views/stuPageScore/index.vue'
import StuStudentView from '@/views/stuPageStudent/index.vue'
import StuTeacherView from '@/views/stuPageTeacher/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/stuIndex',
    name: '',
    component: StuLayoutView,
    children:[
        {path: '/stuIndex',name: 'stuIndex',component: StuIndexView},
        {path: '/stuPageCourse',name: 'stuPageCourse',component: StuCourseView},
        {path: '/stuPageDept',name: 'stuPageDept',component: StuDeptView},
        {path: '/stuPageEmp',name: 'stuPageEmp',component: StuEmpView},
        {path: '/stuPageScore',name: 'stuPageScore',component: StuScoreView},
        {path: '/stuPageStudent',name: 'stuPageStudent',component: StuStudentView},
        {path: '/stuPageTeacher',name: 'stuPageTeacher',component: StuTeacherView}
     ]
  },
  {
    path: '/index',
    name: '',
    component: LayoutView,
    children:[
        {path: '/index',name: 'index',component: IndexView},
        {path: '/clazz',name: 'clazz',component: ClazzView},
        {path: '/dept',name: 'dept',component: DeptView},
        {path: '/emp',name: 'emp',component: EmpView},
        {path: '/course',name: 'course',component: CourseView},
        {path: '/teacher',name: 'teacher',component: TeacherView},
        {path: '/score',name: 'score',component: ScoreView},
        {path: '/empReport',name: 'empReport',component: EmpReportView},
        {path: '/studentReport',name: 'studentReport',component: StuReportView},
        {path: '/student',name: 'student',component: StudentView},
        {path:'/teacherReport',name:'teacherReport',component: TeacherReportView},
        {path:'/scoreReport',name:'scoreReport',component: ScoreReport}
     ]
  }
  ]
})

export default router