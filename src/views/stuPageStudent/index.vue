<script setup>
import { ref, onMounted } from 'vue';
import { queryMyApi, queryScoreApi } from '@/api/stuPageStudent';
import { ElMessage } from 'element-plus';


// 加载状态
const loading = ref({
  info: false,
  score: false
});

// 学生信息
const myInfo = ref({
  name: '',
  gender: '',
  email: '',
  phone: '',
  clazzName: '', // 建议显示班级名称而非ID
  admissionDate: ''
});

// 成绩信息
const scoreInfo = ref([]);

// 钩子函数
onMounted(() => {
  queryInfo();
  queryScore();
});

// 查询个人信息
const queryInfo = async () => {
  try {
    loading.value.info = true;
    const result = await queryMyApi();
    if (result.code) {
      myInfo.value = {
        name: result.data.name,
        gender: result.data.gender,
        email: result.data.email,
        phone: result.data.phone,
        clazzName: result.data.clazzName, 
        admissionDate: result.data.admissionDate 
      };
    } else {
      ElMessage.error(result.msg || '获取个人信息失败');
    }
  } catch (error) {
    ElMessage.error('网络错误，请稍后重试');
  } finally {
    loading.value.info = false;
  }
};

// 查询成绩信息
const queryScore = async () => {
  try {
    loading.value.score = true;
    const result = await queryScoreApi();
    if (result.code) {
      scoreInfo.value = result.data;
    } else {
      ElMessage.error(result.msg || '获取成绩信息失败');
    }
  } catch (error) {
    ElMessage.error('网络错误，请稍后重试');
  } finally {
    loading.value.score = false;
  }
};
</script>

<template>
  <div class="student-container">
    <!-- 个人信息卡片 -->
    <el-card class="info-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <h2>个人信息</h2>
          <el-button type="primary" size="small" @click="queryInfo" :loading="loading.info">
            刷新
          </el-button>
        </div>
      </template>
      
      <el-skeleton :loading="loading.info" animated>
        <template #template>
          <el-skeleton-item variant="text" style="width: 30%" />
          <el-skeleton-item variant="text" style="width: 50%" />
          <el-skeleton-item variant="text" style="width: 70%" />
          <el-skeleton-item variant="text" style="width: 60%" />
          <el-skeleton-item variant="text" style="width: 40%" />
          <el-skeleton-item variant="text" style="width: 80%" />
        </template>
        
        <template #default>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="姓名">{{ myInfo.name || '-' }}</el-descriptions-item>
            <el-descriptions-item label="性别">
              <el-tag :type="myInfo.gender === '1' ? 'primary' : 'danger'">
                {{ myInfo.gender == '1' ? '男' : (myInfo.gender == '0' ? '女' : '-') }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="邮箱">{{ myInfo.email || '-' }}</el-descriptions-item>
            <el-descriptions-item label="电话">{{ myInfo.phone || '-' }}</el-descriptions-item>
            <el-descriptions-item label="班级">{{ myInfo.clazzName || '-' }}</el-descriptions-item>
            <el-descriptions-item label="入学日期">{{ myInfo.admissionDate || '-' }}</el-descriptions-item>
          </el-descriptions>
        </template>
      </el-skeleton>
    </el-card>

    <!-- 成绩信息卡片 -->
    <el-card class="score-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <h2>成绩信息</h2>
          <el-button type="primary" size="small" @click="queryScore" :loading="loading.score">
            刷新
          </el-button>
        </div>
      </template>
      
      <el-skeleton :loading="loading.score" animated :rows="5">
        <template #default>
          <el-table :data="scoreInfo" border style="width: 100%"v-loading="loading.score">
            <el-table-column type="index" label="序号" width="60" align="center" />
            <el-table-column prop="courseName" label="课程名称" min-width="80" align="center" />
            <el-table-column prop="teacherName" label="授课教师" min-width="80" align="center" />
            <el-table-column prop="regularScore" label="平时成绩(30%)" width="140" align="center">
              <template #default="{row}">
                {{ row.regularScore || 0 }}
              </template>
            </el-table-column>
            <el-table-column prop="examScore" label="考试成绩(70%)" width="140" align="center">
              <template #default="{row}">
                {{ row.examScore || 0 }}
              </template>
            </el-table-column>
            <el-table-column prop="finalScore" label="总成绩" width="120" align="center">
              <template #default="{row}">
                <el-tag :type="row.finalScore >= 60 ? 'success' : 'danger'">
                  {{ row.finalScore || 0 }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-skeleton>
    </el-card>
  </div>
</template>

<style scoped>
.student-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.info-card, .score-card {
  margin-bottom: 24px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2 {
  margin: 0;
  color: var(--el-text-color-primary);
}

.el-descriptions {
  margin-top: 10px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .el-descriptions {
    :deep(.el-descriptions-item__label) {
      width: 80px;
    }
  }
  
  .el-table {
    font-size: 12px;
  }
}
</style>