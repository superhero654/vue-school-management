<script setup>
import {ref,onMounted} from "vue";
import { ElMessage,ElMessageBox } from "element-plus";
import {useRouter} from 'vue-router'

//路由
const router = useRouter();

//退出登录
const loginOut = ()=>{
  //弹出确认框
  ElMessageBox.confirm('你确认退出登录吗?','提示',
    {confirmButtonText: '确认',cancelButtonText: '取消',type: 'warning'}
  ).then(async() => {//点击确认按钮
      ElMessage({
        type: 'success',
        message: '退出登录成功'
      });
      //清空本地存储
      localStorage.removeItem('loginUser');
      //跳转到登录页面
      router.push('/');
    })
    .catch(() => {//点击取消按钮
      ElMessage({
        type: 'info',
        message: '你已取消退出'
      })
    })
}

</script>

<template>
  <div class="common-layout">
    <el-container>
      <!-- Header 区域 -->
      <el-header class="header">
        <span class="title">学校信息管理系统</span>
        <span class="right_tool">
          <a href="javascript:void(0)">
            <el-icon><EditPen /></el-icon> 修改密码 &nbsp;&nbsp;&nbsp; |  &nbsp;&nbsp;&nbsp;
          </a>
          <a href="javascript:void(0)" @click="loginOut">
            <el-icon><SwitchButton /></el-icon> 退出登录 【管理员】
          </a>
        </span>
      </el-header>
      
      <el-container>
        <!-- 左侧菜单 -->
        <el-aside width="200px" class="aside">
          <!-- 左侧菜单栏 -->
          <el-menu router>
            <!-- 首页菜单 -->
            <el-menu-item index="/index">
              <el-icon><Promotion /></el-icon> 首页
            </el-menu-item>

            <!-- 班级管理菜单 -->
            <el-sub-menu index="/manage">
              <template #title>
                <el-icon><Menu /></el-icon> 班级学员管理
              </template>
              <el-menu-item index="/clazz">
                <el-icon><HomeFilled /></el-icon>班级管理
              </el-menu-item>
              <el-menu-item index="/student">
                <el-icon><UserFilled /></el-icon>学生管理
              </el-menu-item>
            </el-sub-menu>
            
            <!-- 课程管理菜单 -->
            <el-sub-menu index="/tmanage">
              <template #title>
                <el-icon><Menu /></el-icon> 教师课程管理
              </template>
              <el-menu-item index="/course">
                <el-icon><HomeFilled /></el-icon>课程管理
              </el-menu-item>
              <el-menu-item index="/teacher">
                <el-icon><UserFilled /></el-icon>教师管理
              </el-menu-item>
              <el-menu-item index="/score">
                <el-icon><Star /></el-icon>成绩管理
              </el-menu-item>
            </el-sub-menu>

            <!-- 系统信息管理 -->
            <el-sub-menu index="/system">
              <template #title>
                <el-icon><Tools /></el-icon>职工信息管理
              </template>
              <el-menu-item index="/dept">
                <el-icon><HelpFilled /></el-icon>部门管理
              </el-menu-item>
              <el-menu-item index="/emp">
                <el-icon><Avatar /></el-icon>职工管理
              </el-menu-item>
            </el-sub-menu>

            <!-- 数据统计管理 -->
            <el-sub-menu index="/report">
              <template #title>
                <el-icon><Histogram /></el-icon>数据统计管理
              </template>
              <el-menu-item index="/empReport">
                <el-icon><InfoFilled /></el-icon>职工信息统计
              </el-menu-item>
              <el-menu-item index="/studentReport">
                <el-icon><Share /></el-icon>学生信息统计
              </el-menu-item>
              <el-menu-item index="/teacherReport">
                <el-icon><Avatar /></el-icon>教师信息统计
              </el-menu-item>
              <el-menu-item index="/scoreReport">
                <el-icon><HelpFilled /></el-icon>成绩信息统计
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.el-container {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.header {
  background: linear-gradient(135deg, #1a3a8f 0%, #2563eb 100%);
  box-shadow: 0 2px 10px rgba(26, 58, 143, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 60px;
}

.title {
  color: white;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 1px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to right, #ffffff 0%, #e6f0ff 100%);
  -webkit-background-clip: text;
  background-clip: text; 
  -webkit-text-fill-color: transparent;
}

.right_tool {
  float: right;
  line-height: 60px;
}

a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

a:hover {
  color: #a5b4fc;
}

.el-container {  /* 这是包含aside和main的容器 */
  flex: 1;
  overflow: hidden;
}

.el-aside {
  width: 220px !important;
  border-right: 1px solid #e4e7ed;
  height: 100%;
  overflow-y: auto;
  background-color: #fff;
}

.el-main {
  padding: 0 !important;
  margin: 0 !important;
  height: 100%;
  overflow-y: auto;
}

/* 菜单样式优化 */
.el-menu {
  border-right: none;
}

.el-menu-item, .el-sub-menu__title {
  height: 50px;
  line-height: 50px;
}

.el-menu-item.is-active {
  background-color: #f0f7ff;
  color: #2563eb;
}

.el-menu-item {
  transition: all 0.3s;
}
</style>