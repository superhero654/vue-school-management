<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // 粒子特效初始化
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 1479; // 固定宽度
  canvas.height = 889; // 固定高度

  // 粒子数组
  const particles = [];
  const particleCount = 60;

  // 粒子类
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      this.color = `rgba(70, 130, 200, ${Math.random() * 0.4 + 0.1})`;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
      if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 初始化粒子
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // 动画循环
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 更新和绘制粒子
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      
      // 绘制粒子间的连线
      for (let j = i; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          ctx.strokeStyle = `rgba(70, 130, 200, ${0.8 - distance / 120})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }

  animate();
});
</script>

<template>
  <div class="dashboard-container">
    <!-- 粒子画布 -->
    <canvas id="particle-canvas" class="particle-canvas"></canvas>
    
    <!-- 主内容 -->
    <div class="dashboard-content">
      <div class="header">
        <div class="logo">
          <img src="../../assets/school.jpg" alt="校徽" class="school-badge">
          <div class="title-group">
            <h1>学校信息管理系统</h1>
            <p class="subtitle">学生端</p>
          </div>
        </div>
      </div>
      
      <div class="main-section">
        <div class="card-row">
          <div class="feature-card">
            <div class="card-icon">📝</div>
            <h3>学生信息查看</h3>
            <p>查看学生信息和在线考试信息</p>
          </div>
          
          <div class="feature-card">
            <div class="card-icon">📊</div>
            <h3>教学信息查看</h3>
            <p>多维度教学数据的展示</p>
          </div>
          
          <div class="feature-card">
            <div class="card-icon">💬</div>
            <h3>职工信息查看</h3>
            <p>多渠道查看职工信息的管理</p>
          </div>
        </div>
        
        <div class="divider"></div>
        
        <div class="section-title">
          <h2>教务系统</h2>
        </div>
        
        <div class="card-grid">
          <div class="service-card">
            <h3>教师查看</h3>
            <p>教师安排等课程工作查看</p>
          </div>
          
          <div class="service-card">
            <h3>成绩查看</h3>
            <p>考勤成绩信息查看获取</p>
          </div>
          
          <div class="service-card">
            <h3>后勤保障</h3>
            <p>保障学生生活，及时反馈意见</p>
          </div>
        </div>
      </div>
      
      <div class="footer">
        <p>© 2025 super管理平台 版权所有</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  position: relative;
  width: 1479px;
  height: 889px;
  margin: 0 auto;
  overflow: hidden;
  background: linear-gradient(135deg, #f8fbff 0%, #e6f0ff 100%);
  font-family: "Microsoft YaHei", "SimSun", sans-serif;
}

.particle-canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.dashboard-content {
  position: relative;
  z-index: 2;
  width: 1200px;
  margin: 0 auto;
  padding: 30px;
}

.header {
  margin-bottom: 40px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 15px;
}

.school-badge {
  width: 100px;
  height: 100px;
}

.title-group h1 {
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 5px;
  font-weight: 600;
}

.title-group .subtitle {
  color: #5a7ea3;
  font-size: 16px;
  font-weight: 500;
}

.main-section {
  width: 1140px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  padding: 30px;
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.card-row {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.feature-card {
  width: 360px;
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #4a90e2;
}

.card-icon {
  font-size: 32px;
  margin-bottom: 15px;
  color: #4a90e2;
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 18px;
}

.feature-card p {
  color: #7f8c8d;
  font-size: 14px;
  line-height: 1.5;
}

.divider {
  height: 1px;
  background: linear-gradient(to right, transparent, #dbe6f0, transparent);
  margin: 30px 0;
}

.section-title {
  margin-bottom: 25px;
}

.section-title h2 {
  color: #2c3e50;
  font-size: 22px;
  position: relative;
  display: inline-block;
  padding-bottom: 8px;
}

.section-title h2::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50%;
  height: 3px;
  background: linear-gradient(to right, #4a90e2, #2ecc71);
  border-radius: 3px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 360px);
  gap: 20px;
}

.service-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border-top: 3px solid #4a90e2;
}

.service-card h3 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 16px;
}

.service-card p {
  color: #7f8c8d;
  font-size: 14px;
  line-height: 1.5;
}

.footer {
  text-align: center;
  margin-top: 100px;
  padding: 150px;
  color: #95a5a6;
  font-size: 13px;
}

.dashboard-content::before {
  content: "📚";
  position: absolute;
  bottom: 30px;
  right: 30px;
  font-size: 60px;
  opacity: 0.08;
  z-index: -1;
}

.feature-card:nth-child(1) .card-icon {
  color: #4a90e2;
}
.feature-card:nth-child(2) .card-icon {
  color: #2ecc71;
}
.feature-card:nth-child(3) .card-icon {
  color: #e74c3c;
}
</style>