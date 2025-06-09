<script setup>
import { ref, computed } from 'vue'
import{stuLoginApi,adminLoginApi} from '@/api/login'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

  const router = useRouter();
  let loginForm = ref({username:'', password:''})

  const selectedRole = ref('student')
  const roleValue = computed(() => {
  // 学生=0，管理员=1
  return selectedRole.value === 'admin' ? 1 : 0
})
// 为飘落的书页生成随机样式
  const pageStyle = (index) => {
  const rotate = Math.random() * 30 - 15;
  const duration = 10 + Math.random() * 10;
  const delay = Math.random() * 5;
  const left = Math.random() * 100;
  const move = Math.random() * 2 - 1;
  
  return {
    '--rotate': `${rotate}deg`,
    '--move': move,
    left: `${left}%`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`
  }
}

//登录
  const login = async() => {
    if(roleValue.value === 0){
      const result = await stuLoginApi(loginForm.value);
      if(result.code){
      //提示信息
      ElMessage.success("登录成功");
      //存储当前登录员工的信息
      localStorage.setItem('loginUser', JSON.stringify(result.data))
      //跳转到首页
      router.push('/stuIndex')
    }else{
      //提示信息
      ElMessage.error(result.msg);
    }
    }else{
      const result = await adminLoginApi(loginForm.value);
      if(result.code){
      //提示信息
      ElMessage.success("登录成功");
      //存储当前登录员工的信息
      localStorage.setItem('loginUser', JSON.stringify(result.data))
      //跳转到首页
      router.push('/index')
    }else{
      //提示信息
      ElMessage.error(result.msg);
    }
    }
  }
  //重置
  const clear = () => {
    loginForm.value = {username:'', password:''}
  }
</script>

<template>
  <div class="login-container">
    <!-- 背景元素 -->
    <div class="chinese-brush"></div>
    <div class="ink-dot-1"></div>
    <div class="ink-dot-2"></div>
    <div class="classic-pattern"></div>
    
    <div class="login-box">
      <!-- 顶部装饰 -->
      <div class="decoration-top">
        <div class="scroll-left"></div>
        <div class="scroll-right"></div>
      </div>
      
      <!-- 主内容区 -->
      <div class="login-content">
        <div class="login-header">
          <h1>学校信息管理系统</h1>
          <p>博学之 · 审问之 · 慎思之 · 明辨之 · 笃行之</p>
        </div>
        
        <!-- 角色选择 -->
        <div class="role-selector">
          <el-radio-group v-model="selectedRole">
            <el-radio-button label="student">
              <span class="role-icon">🎓</span> 学生登录
            </el-radio-button>
            <el-radio-button label="admin">
              <span class="role-icon">📚</span> 管理员登录
            </el-radio-button>
          </el-radio-group>
        </div>
        
        <!-- 登录表单 -->
        <el-form class="login-form" label-position="top">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入账号" prefix-icon="User" size="large" class="elegant-input">
              <template #prefix>
                <i class="iconfont icon-account"></i>
              </template>
            </el-input>
          </el-form-item>
          
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="请输入密码" prefix-icon="Lock" size="large" class="elegant-input">
              <template #prefix>
                <i class="iconfont icon-password"></i>
              </template>
            </el-input>
          </el-form-item>
          
          <el-form-item>
            <el-button 
              type="primary" 
              size="large" 
              class="login-btn" 
              @click="login"
            >
              <i class="iconfont icon-login"></i> 登录
            </el-button>
            <el-button 
              type="info" 
              size="large" 
              class="reset-btn" 
              @click="clear"
            >
              <i class="iconfont icon-reset"></i> 重置
            </el-button>
          </el-form-item>
        </el-form>
        
        <!-- 底部诗句 -->
        <div class="poem">
          <p>书山有路勤为径，学海无涯苦作舟</p>
        </div>
      </div>
      
      <!-- 底部装饰 -->
      <div class="decoration-bottom">
        <div class="seal"></div>
      </div>
    </div>
    
    <!-- 飘落的书页效果 -->
    <div class="falling-pages">
      <div v-for="i in 8" :key="i" class="page" :style="pageStyle(i)"></div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@400;700&display=swap');

.login-container {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #f0f5ff;
  font-family: 'Noto Serif SC', serif;
}

/* 背景装饰元素 */
.chinese-brush {
  position: absolute;
  top: -100px;
  right: -100px;
  width: 400px;
  height: 400px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%23d6e4ff" d="M30,10 Q50,5 70,20 Q90,40 80,70 Q70,90 40,85 Q10,80 15,50 Q20,20 30,10" opacity="0.3"/></svg>') no-repeat;
  background-size: contain;
  transform: rotate(30deg);
  z-index: 0;
}

.ink-dot-1, .ink-dot-2 {
  position: absolute;
  border-radius: 50%;
  background: rgba(70, 110, 170, 0.05);
}

.ink-dot-1 {
  width: 200px;
  height: 200px;
  bottom: -50px;
  left: -50px;
}

.ink-dot-2 {
  width: 150px;
  height: 150px;
  top: 30%;
  right: 10%;
}

.classic-pattern {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="none" stroke="%23d6e4ff" stroke-width="0.5" stroke-dasharray="2,2"/></svg>');
  background-size: 50px 50px;
  opacity: 0.3;
  z-index: 0;
}

/* 登录框主体 */
.login-box {
  position: relative;
  z-index: 2;
  width: 480px;
  background: rgba(248, 251, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid #c0d0e8;
  overflow: hidden;
}

/* 顶部卷轴装饰 */
.decoration-top {
  position: relative;
  height: 20px;
  background: linear-gradient(to right, #4a7cb8, #6b9bd2, #4a7cb8);
}

.scroll-left, .scroll-right {
  position: absolute;
  top: 0;
  width: 40px;
  height: 100%;
  background: #3a6ba8;
}

.scroll-left {
  left: 0;
  border-radius: 0 10px 10px 0;
}

.scroll-right {
  right: 0;
  border-radius: 10px 0 0 10px;
}

/* 登录内容区 */
.login-content {
  padding: 30px 40px;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h1 {
  font-size: 36px;
  color: #2c5a8c;
  margin-bottom: 10px;
  font-weight: 700;
  font-family: 'Ma Shan Zheng', cursive;
  letter-spacing: 2px;
}

.login-header p {
  color: #7a8b9e;
  font-size: 14px;
  letter-spacing: 1px;
}

/* 角色选择 */
.role-selector {
  margin-bottom: 25px;
}

.role-selector :deep(.el-radio-group) {
  display: flex;
  width: 100%;
}

.role-selector :deep(.el-radio-button) {
  flex: 1;
}

.role-selector :deep(.el-radio-button__inner) {
  width: 100%;
  background: #e6f0f5;
  border: 1px solid #c0d0e8;
  color: #2c5a8c;
  font-size: 16px;
  padding: 12px;
  transition: all 0.3s;
}

.role-selector :deep(.el-radio-button__orig-radio:checked + .el-radio-button__inner) {
  background: #2c5a8c;
  border-color: #2c5a8c;
  color: white;
  box-shadow: none;
}

.role-icon {
  margin-right: 8px;
  font-size: 18px;
}

/* 表单样式 */
.login-form {
  margin-top: 20px;
}

.login-form :deep(.el-form-item__label) {
  font-weight: bold;
  color: #2c5a8c;
  padding-bottom: 8px;
  font-size: 15px;
}

.elegant-input :deep(.el-input__wrapper) {
  background: #f8fbff;
  border: 1px solid #c0d0e8;
  box-shadow: none;
  padding: 5px 15px;
}

.elegant-input :deep(.el-input__inner) {
  color: #3a4a5a;
  height: 40px;
  line-height: 40px;
}

.elegant-input :deep(.el-input__prefix) {
  color: #5a8cb8;
  margin-right: 10px;
}

/* 按钮样式 */
.login-btn, .reset-btn {
  width: 48%;
  font-size: 16px;
  letter-spacing: 1px;
  transition: all 0.3s;
  border-radius: 4px;
  padding: 12px;
}

.login-btn {
  background: linear-gradient(to right, #2c5a8c, #4a7cb8);
  border: none;
  color: white;
  box-shadow: 0 4px 12px rgba(44, 90, 140, 0.3);
}

.login-btn:hover {
  background: linear-gradient(to right, #4a7cb8, #2c5a8c);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(44, 90, 140, 0.4);
}

.reset-btn {
  background: #e6f0f5;
  border: 1px solid #c0d0e8;
  color: #2c5a8c;
}

.reset-btn:hover {
  background: #d0e0f0;
  transform: translateY(-2px);
}

.iconfont {
  margin-right: 8px;
}

/* 底部诗句 */
.poem {
  text-align: center;
  margin-top: 30px;
  color: #7a8b9e;
  font-size: 14px;
  font-style: italic;
}

/* 底部印章装饰 */
.decoration-bottom {
  position: relative;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.seal {
  width: 80px;
  height: 80px;
  background: #2c5a8c;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 16px;
  transform: rotate(15deg);
  border-radius: 5px;
  position: relative;
  top: -30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.seal:before {
  content: "学海书苑";
  letter-spacing: 2px;
}

/* 飘落的书页效果 */
.falling-pages {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.page {
  position: absolute;
  width: 20px;
  height: 30px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.1);
  transform: rotate(var(--rotate));
  animation: falling linear infinite;
  opacity: 0.8;
}

@keyframes falling {
  0% {
    top: -50px;
    transform: rotate(var(--rotate)) translateX(0);
  }
  100% {
    top: 100vh;
    transform: rotate(var(--rotate)) translateX(calc(var(--move) * 100px));
  }
}

/* 为每个书页生成不同的样式 */
.page:nth-child(1) {
  --rotate: 15deg;
  --move: 0.5;
  left: 10%;
  animation-duration: 15s;
  animation-delay: 0s;
}

.page:nth-child(2) {
  --rotate: -10deg;
  --move: -0.3;
  left: 25%;
  animation-duration: 18s;
  animation-delay: 2s;
}

.page:nth-child(3) {
  --rotate: 5deg;
  --move: 0.8;
  left: 40%;
  animation-duration: 12s;
  animation-delay: 1s;
}

.page:nth-child(4) {
  --rotate: -15deg;
  --move: -0.2;
  left: 55%;
  animation-duration: 16s;
  animation-delay: 3s;
}

.page:nth-child(5) {
  --rotate: 10deg;
  --move: 0.3;
  left: 70%;
  animation-duration: 14s;
  animation-delay: 0.5s;
}

.page:nth-child(6) {
  --rotate: -5deg;
  --move: -0.7;
  left: 85%;
  animation-duration: 13s;
  animation-delay: 2.5s;
}

.page:nth-child(7) {
  --rotate: 20deg;
  --move: 0.4;
  left: 30%;
  animation-duration: 17s;
  animation-delay: 1.5s;
}

.page:nth-child(8) {
  --rotate: -8deg;
  --move: -0.5;
  left: 65%;
  animation-duration: 11s;
  animation-delay: 0.8s;
}
</style>