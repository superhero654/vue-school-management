<script setup>
import { ref,onMounted } from 'vue'
import {queryAllApi} from '@/api/dept'
import { ElMessage,ElMessageBox } from 'element-plus'

//钩子函数
onMounted(() => {
  search();
})

//查询
const search = async() => {
  const result = await queryAllApi();
  if(result.code){
    deptList.value = result.data;
  }
}

const deptList = ref([])
</script>

<template>
  <h1>后勤部门查看</h1>

  <!-- 表格 -->
  <div class="container">
    <el-table :data="deptList" border style="width: 100%">
    <el-table-column type="index" label="序号" width="400" align="center"/>
    <el-table-column prop="name" label="部门名称" width="600" align="center"/>
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
