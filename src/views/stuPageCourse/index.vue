<script setup>
import { ref,onMounted } from 'vue'
import {queryAllApi} from '@/api/stuPageCourse'
import { ElMessage,ElMessageBox } from 'element-plus'

//钩子函数
onMounted(() => {
  search();
})

const courseList = ref([])

//查询
const search = async() => {
  const result = await queryAllApi();
  if(result.code){
    courseList.value = result.data;
  }
}
</script>

<template>
  <h1>课程查看</h1>

  <!-- 表格 -->
  <div class="container">
    <el-table :data="courseList" border style="width: 100%">
    <el-table-column type="index" label="序号" width="300" align="center"/>
    <el-table-column prop="name" label="课程名称" width="400" align="center"/>
    <el-table-column prop="credit" label="学分" width="400" align="center"/>
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button type="primary" @click="edit(scope.row.id)"><el-icon><EditPen /></el-icon>查看</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<style scoped>
h1 {
  margin: 20px 20px;
}
.container {
  margin: 20px 20px;
}
</style>
