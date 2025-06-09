<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 粒子效果初始化
  if (window.particlesJS) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 120, density: { enable: true, value_area: 1000 } },
        color: { value: "#3a86ff" },
        shape: { type: "circle" },
        opacity: { value: 0.6, random: true },
        size: { value: 4, random: true },
        line_linked: {
          enable: true,
          distance: 180,
          color: "#3a86ff",
          opacity: 0.3,
          width: 1.2
        },
        move: {
          enable: true,
          speed: 2.5,
          direction: "none",
          random: true,
          out_mode: "out"
        }
      },
      interactivity: {
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" }
        }
      }
    })
  }
})

const features = [
  {
    icon: "fa-user-graduate",
    title: "学生管理",
    desc: "学生信息、班级等信息管理，实现信息化总管理",
  },
  {
    icon: "fa-book-open",
    title: "课程管理",
    desc: "课程设置管理，教学实践的存档管理"
  },
  {
    icon: "fa-chalkboard-teacher",
    title: "教师管理",
    desc: "教师信息、教师授课等综合管理"
  },
  {
    icon: "fa-chart-line",
    title: "成绩管理",
    desc: "学生成绩录入、分析与统计，提供学业评估"
  },
  {
    icon: "fa-archive",
    title: "资源管理",
    desc: "教学资料管理，通过数据库实现资源共享"
  },
  {
    icon: "fa-file-alt",
    title: "系统管理",
    desc: "教学职工和部门管理"
  }
]
</script>

<template>
  <div id="particles-js" class="particles-bg"></div>
  
  <div class="container">
    <header class="header">
      <h1 class="title">学校信息管理系统</h1>
      <p class="subtitle">综合管理服务平台</p>
      <div class="header-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
        </svg>
      </div>
    </header>
    
    <main class="main-content">
      <p class="description">
        欢迎访问学校信息管理系统<br>
        管理员页面<br>
      </p>
      
      <div class="features-grid">
        <div 
          v-for="(feature, index) in features" 
          :key="index" 
          class="feature-card"
          :style="{ '--delay': index * 0.1 + 's' }"
        >
          <div class="card-icon">
            <i :class="'fas ' + feature.icon"></i>
          </div>
          <h3 class="card-title">{{ feature.title }}</h3>
          <p class="card-desc">{{ feature.desc }}</p>
          <span v-if="feature.date" class="card-date">{{ feature.date }}</span>
          <div class="card-wave"></div>
        </div>
      </div>
    </main>
    
    <footer class="footer">
      <div class="footer-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
        </svg>
      </div>
      <div class="footer-content">
        <p>智慧校园 · 数字管理 · 创新发展</p>
      </div>
    </footer>
  </div>
  
  <!-- 装饰元素 -->
  <i class="decor decor-book fas fa-book"></i>
  <i class="decor decor-pen fas fa-pen-fancy"></i>
  <i class="decor decor-ruler fas fa-ruler-combined"></i>
  <i class="decor decor-graduation fas fa-graduation-cap"></i>
</template>

<style scoped>
/* 基础样式 */
:root {
  --primary: #3a86ff;
  --primary-light: rgba(58, 134, 255, 0.7);
  --primary-lighter: rgba(58, 134, 255, 0.3);
  --primary-dark: #2667d6;
  --bg: #f8fafc;
  --text: #1e293b;
  --text-light: #64748b;
  --card-bg: rgba(255, 255, 255, 0.95);
  --transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  scroll-behavior: smooth;
}

/* 布局样式 */
.container {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
  z-index: 2;
}

.particles-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f0f7ff 0%, #d6e6ff 100%);
  z-index: 1;
}

/* 头部样式 */
.header {
  text-align: center;
  padding: 4rem 2rem 6rem;
  position: relative;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  margin-bottom: 3rem;
  clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
}

.header-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  color: white;
  transform: rotate(180deg);
}

.header-wave svg {
  width: 100%;
  height: 100%;
}

.title {
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  animation: fadeInDown 0.8s ease-out;
}

.subtitle {
  font-size: 1.4rem;
  font-weight: 300;
  letter-spacing: 3px;
  opacity: 0.9;
  animation: fadeIn 1s ease-out 0.3s forwards;
  opacity: 0;
}

.main-content {
  flex: 1;
  padding: 0 2rem 4rem;
}

.description {
  text-align: center;
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--text);
  margin: -2rem auto 4rem;
  max-width: 800px;
  padding: 1.5rem 2rem;
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(58, 134, 255, 0.1);
  position: relative;
  z-index: 2;
  transform: translateY(-50%);
  border: 1px solid rgba(58, 134, 255, 0.15);
  animation: fadeInUp 0.8s ease-out 0.5s forwards;
  opacity: 0;
}

/* 特性卡片 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin: 0 auto;
  max-width: 1200px;
}

.feature-card {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  box-shadow: 0 10px 30px rgba(58, 134, 255, 0.1);
  transition: var(--transition);
  border: 1px solid rgba(58, 134, 255, 0.1);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease-out forwards;
  animation-delay: var(--delay);
  z-index: 1;
}

.feature-card:hover {
  transform: translateY(-10px) scale(1.02) !important;
  box-shadow: 0 15px 40px rgba(58, 134, 255, 0.2);
  border-color: rgba(58, 134, 255, 0.3);
}

.feature-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--primary-lighter) 0%, transparent 100%);
  opacity: 0;
  transition: var(--transition);
  z-index: -1;
}

.feature-card:hover::before {
  opacity: 1;
}

.card-icon {
  font-size: 2.2rem;
  color: var(--primary);
  margin-bottom: 1.5rem;
  transition: var(--transition);
}

.feature-card:hover .card-icon {
  transform: scale(1.1);
  color: var(--primary-dark);
}

.card-title {
  font-size: 1.5rem;
  color: var(--primary-dark);
  margin-bottom: 1.2rem;
  font-weight: 600;
  transition: var(--transition);
}

.feature-card:hover .card-title {
  color: var(--primary);
}

.card-desc {
  color: var(--text-light);
  line-height: 1.7;
  font-size: 1rem;
  transition: var(--transition);
}

.feature-card:hover .card-desc {
  color: var(--text);
}

.card-date {
  display: inline-block;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: var(--primary-light);
  font-style: italic;
  transition: var(--transition);
}

.feature-card:hover .card-date {
  color: var(--primary-dark);
}

.card-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10px;
  background: linear-gradient(90deg, var(--primary), var(--primary-dark));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1);
}

.feature-card:hover .card-wave {
  transform: scaleX(1);
}

/* 页脚 */
.footer {
  margin-top: auto;
  position: relative;
  color: white;
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
  clip-path: polygon(0 10%, 100% 0, 100% 100%, 0% 100%);
  padding-top: 6rem;
}

.footer-wave {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  color: white;
}

.footer-wave svg {
  width: 100%;
  height: 100%;
}

.footer-content {
  padding: 2rem 0 3rem;
  text-align: center;
  font-size: 1rem;
  opacity: 0.9;
}

/* 装饰元素 */
.decor {
  position: fixed;
  color: rgba(58, 134, 255, 0.15);
  z-index: 1;
  transition: var(--transition);
}

.decor:hover {
  color: rgba(58, 134, 255, 0.3);
  transform: scale(1.1);
}

.decor-book {
  font-size: 10rem;
  top: 15%;
  right: 5%;
  animation: float 8s ease-in-out infinite;
}

.decor-pen {
  font-size: 6rem;
  bottom: 20%;
  left: 8%;
  animation: float 7s ease-in-out infinite 1s;
}

.decor-ruler {
  font-size: 5rem;
  top: 25%;
  left: 5%;
  animation: float 9s ease-in-out infinite 0.5s;
}

.decor-graduation {
  font-size: 7rem;
  bottom: 15%;
  right: 10%;
  animation: float 6s ease-in-out infinite 1.5s;
}

/* 动画 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .decor {
    display: none;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 3rem 1.5rem 5rem;
    clip-path: polygon(0 0, 100% 0, 100% 95%, 0 100%);
  }
  
  .title {
    font-size: 2.4rem;
  }
  
  .subtitle {
    font-size: 1.1rem;
    letter-spacing: 2px;
  }
  
  .description {
    margin: -1.5rem auto 3rem;
    padding: 1.2rem 1.5rem;
    font-size: 1rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
  }
  
  .feature-card {
    padding: 2rem 1.5rem;
  }
  
  .footer {
    clip-path: polygon(0 5%, 100% 0, 100% 100%, 0% 100%);
    padding-top: 4rem;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 2.5rem 1rem 4rem;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
    letter-spacing: 1px;
  }
  
  .description {
    margin: -1rem auto 2.5rem;
    padding: 1rem;
  }
  
  .main-content {
    padding: 0 1rem 3rem;
  }
}
</style>