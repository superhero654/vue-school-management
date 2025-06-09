<script setup>
import { ref,onMounted } from 'vue'
import {queryAllApi,addApi,queryByIdApi,updateApi,deleteByIdApi} from '@/api/course'
import { ElMessage,ElMessageBox } from 'element-plus'

//钩子函数
onMounted(() => {
  search();
})

//查询
const search = async() => {
  const result = await queryAllApi();
  if(result.code){
    courseList.value = result.data;
  }
}

const courseList = ref([])

//Dialog对话框
const dialogFormVisible = ref(false);
const formTitle = ref('');
const course = ref({
  name: '',
  credit:''
});

//新增课程
const addcourse = () => {
  dialogFormVisible.value = true;
  formTitle.value = '新增课程';
  course.value = {
    name: '' ,
    credit:''
  }
  //重置表单
  if(courseFormRef.value){
    courseFormRef.value.resetFields();
  }
}

//保存课程
const save = async() => {
  //表单校验
  if(!courseFormRef.value){
    return; 
  }
  courseFormRef.value.validate(async (valid) => {
    if(valid){
      let result;
      if(course.value.id){
        result = await updateApi(course.value);
      }else{
        result = await addApi(course.value);
      }
      if(result.code){
        ElMessage.success("操作成功");
        dialogFormVisible.value = false; 
        search();
      }else{
        ElMessage.error(result.msg);
      }
    }else{
      ElMessage.error("表单校验不通过");
    }
  })

  
}

//表单校验
const rules = ref({
  name: [
    { required: true, message: '课程名称是必填项', trigger: 'blur' },
    { min: 2, max: 10, message: '课程名称的长度要在2-10位之间', trigger: 'blur' },
  ],
  credit: [
    { required: true, message: '学分是必填项', trigger: 'blur' },
    { type: 'number', message: '学分必须为数字', trigger: 'blur',transform: (value) => Number(value) },
    { type: 'number', min: 0.5, max: 10, message: '学分范围应在0.5-10之间', trigger: 'blur' }
  ]
})
const courseFormRef = ref();

//编辑  
const edit = async(id) => {
  formTitle.value = '编辑课程';
  if(courseFormRef.value){
    courseFormRef.value.resetFields();
  }

  const result = await queryByIdApi(id);
  if(result.code){
    dialogFormVisible.value = true;
    course.value = result.data;
  }
}

//删除
const deleteById = async(id) => {
  ElMessageBox.confirm('你确认删除该课程吗?','提示',
    {confirmButtonText: '确认',cancelButtonText: '取消',type: 'warning'}
  ).then(async() => {
      const result = await deleteByIdApi(id);
      if(result.code){
        ElMessage.success("删除成功");
        search();
      }else{
        ElMessage.error(result.msg);
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '你已取消删除'
      })
    })
}
</script>

<template>
  <h1>课程管理</h1>
  <div class="container">
    <el-button type="primary" @click="addcourse"> + 新增课程</el-button>
  </div>

  <!-- 表格 -->
  <div class="container">
    <el-table :data="courseList" border style="width: 100%">
    <el-table-column type="index" label="序号" width="100" align="center"/>
    <el-table-column prop="name" label="课程名称" width="260" align="center"/>
    <el-table-column prop="credit" label="学分" width="260" align="center"/>
    <el-table-column prop="updateTime" label="最后操作时间" width="300" align="center"/>
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button type="primary" @click="edit(scope.row.id)"><el-icon><EditPen /></el-icon>编辑</el-button>
        <el-button type="danger" @click="deleteById(scope.row.id)"><el-icon><Delete /></el-icon>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>

  <!-- Dialog对话框 -->
   <el-dialog v-model="dialogFormVisible" :title="formTitle" width="500">
    <el-form :model="course" :rules="rules" ref="courseFormRef">
      <el-form-item label="课程名称" label-width="80px" prop="name">
        <el-input v-model="course.name" />
      </el-form-item>
      <el-form-item label="学分" label-width="80px" prop="credit">
        <el-input v-model="course.credit" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
h1 {
  margin: 20px 20px;
}
.container {
  margin: 20px 20px;
}
</style>
