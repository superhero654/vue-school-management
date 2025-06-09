<script setup>
import { ref,onMounted } from 'vue';
import { queryPageApi,addApi,queryInfoApi,updateApi,deleteApi } from '@/api/score'
import { queryAllApi as queryAllCourseApi} from '@/api/course'
import { queryByNameApi as queryStudentByIdApi} from '@/api/student'
import { queryByNameApi as queryTeacherByIdApi} from '@/api/teacher'
import { ElMessage,ElMessageBox } from 'element-plus';


//课程列表数据
const courses = ref([])


// 搜素表单对象
const searchScore = ref({studentName:'',courseName:'',teacherName:'',min:'',max:''});

//钩子函数
onMounted(() => {
  search();
  queryAllCourse(); 
});

//查询所有课程
const queryAllCourse = async ()=>{
  const result = await queryAllCourseApi();
  if(result.code){
    courses.value = result.data;
  }
}

// 查询
const search = async ()=>{
  const result = await queryPageApi(searchScore.value.studentName,searchScore.value.courseName,searchScore.value.teacherName,Number(searchScore.value.min) || 0,Number(searchScore.value.max) || 100,currentPage.value,pageSize.value);
  if(result.code){
    scoreList.value = result.data.rows;
    total.value = result.data.total;
  }
}

// 清空
const clear = ()=>{
  searchScore.value = {studentName:'',courseName:'',teacherName:'',min:'',max:''};
  search();
}

// 成绩列表数据
const scoreList = ref([])

//分页
const currentPage = ref(1);//页码
const pageSize = ref(10);//每页展示的记录数
const background = ref(true);//是否有背景色
const total = ref(0);//总记录数

//每页展示记录数变化时触发
const handleSizeChange = (val) => {
  search();
}

//页码变化时触发
const handleCurrentChange = (val) => {
  search();
}

//新增成绩
const addScore = ()=>{
  dialogVisible.value = true;
  dialogTitle.value = '新增成绩';
  score.value = {
    studentId: '',
    courseId: '',
    teacherId: '',
    studentName: '',
    courseName: '',
    teacherName: '',
    regularScore: '',
    examScore: '',
    finalScore: ''
  }
  //重置表单
  if(scoreFormRef.value){
    scoreFormRef.value.resetFields();
  }
}

//新增/修改表单
const score = ref({
    studentId: '',
    courseId: '',
    teacherId: '',
    studentName: '',
    courseName: '',
    teacherName: '',
    regularScore: '',
    examScore: '',
    finalScore: ''
})

// 控制弹窗
const dialogVisible = ref(false)
const dialogTitle = ref('新增成绩')

//保存
const save = async () => { 
  //表单校验
if(!scoreFormRef.value){
    return; 
  }
  scoreFormRef.value.validate(async (valid) => {//valid表示是否通过校验
    if(valid){
      let result;
      if(score.value.id){
        result = await updateApi(score.value);
      }else{ 
        result = await addApi(score.value);
      }

      if(result.code){
        ElMessage.success('保存成功'); 
        dialogVisible.value = false;
        search();
      }else{
        ElMessage.error(result.msg);
      }
    }else{
        ElMessage.error("表单校验不通过");
    }
  })
}

// 异步校验学生姓名是否存在
const validateStudentExists = async (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入学生姓名'));
  } 
  const result = await queryStudentByIdApi(value);
  if (result.data !=null) {
    callback();
  } else {
    callback(new Error('该学生不存在'));
  }
}

// 异步校验教师姓名是否存在
const validateTeacherExists = async (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入教师姓名'));
  }
  const result = await queryTeacherByIdApi(value);
  if (result.data !=null) {
    callback();
  } else {
    callback(new Error('该教师不存在'));
  }
}

//表单引用
const scoreFormRef = ref();

//表单校验规则
const rules = ref({
  studentName: [
    { required: true, message: '请输入学生姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度应在2到20个字符之间', trigger: 'blur' },
    // 新增异步校验规则
    { validator: validateStudentExists, trigger: 'blur' }
  ],
  teacherName: [
    { required: true, message: '请输入教师姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度应在2到20个字符之间', trigger: 'blur' },
    { validator: validateTeacherExists, trigger: 'blur' }
  ],
  regularScore: [
    { required: true, message: '成绩不能为空', trigger: 'blur' },
    { type: 'number', message: '成绩必须为数字', trigger: 'blur',transform: (value) => Number(value) },
    { type: 'number', min: 0,max: 100, message: '成绩必须在 0 到 100 之间', trigger: 'blur' }
  ],
  examScore: [
    { required: true, message: '成绩不能为空', trigger: 'blur' },
    { type: 'number', message: '成绩必须为数字', trigger: 'blur',transform: (value) => Number(value) },
    { type: 'number', min: 0,max: 100, message: '成绩必须在 0 到 100 之间', trigger: 'blur' }
  ]
});

//编辑
const edit = async(id) => {
  const result = await queryInfoApi(id);
  if(result.code){
    dialogVisible.value = true;
    dialogTitle.value = '修改成绩';
    score.value = result.data;
  }
}

//删除成绩
const deleteById = (id) => {
    ElMessageBox.confirm('你确认删除该成绩吗?','提示',
      {confirmButtonText: '确认',cancelButtonText: '取消',type: 'warning'}
    ).then(async() => {
      const result = await deleteApi(id);
      if(result.code){
        ElMessage.success("删除成功");
        search();
      }else{
        ElMessage.error(result.msg);
      }
    }).catch(() => {
      ElMessage({
        type: 'info',
        message: '你已取消删除'
      })
    }) 
}

//记录勾选成绩的id
const selectedIds = ref([]);

const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map( item => item.id);
}

//批量删除
const deleteByIds = () => {
    ElMessageBox.confirm('你确认删除该成绩吗?','提示',
      {confirmButtonText: '确认',cancelButtonText: '取消',type: 'warning'}
    ).then(async() => {
      if(selectedIds.value && selectedIds.value.length > 0){
        const result = await deleteApi(selectedIds.value);
        if(result.code){
          ElMessage.success("删除成功");
          search();
        }else{
          ElMessage.error(result.msg);
        }
      }else{
        ElMessage.info("没有选择要删除的数据");
      }
    }).catch(() => {
      ElMessage({
        type: 'info',
        message: '你已取消删除'
      })
    }) 
}
    
</script>

<template>
  <h1>成绩管理</h1>
  <!-- 搜索栏 -->
   <div class="container">
    <el-form :inline="true" :model="searchScore" class="demo-form-inline">
    <el-form-item label="学生姓名">
      <el-input v-model="searchScore.studentName" placeholder="请输入学生姓名" clearable />
    </el-form-item>

    <el-form-item label="课程名称">
      <el-select v-model="searchScore.courseName" placeholder="请选择课程" clearable>
        <el-option v-for="c in courses" :key="c.id"  :label="c.name" :value="c.name"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="教师姓名">
      <el-input v-model="searchScore.teacherName" placeholder="请输入教师姓名" clearable />
    </el-form-item>

    <el-form-item label="成绩区间">
    <!-- 最小值输入 -->
    <el-input
      v-model="searchScore.min"
      type="number"
      placeholder="最低分"
      :min="0"
      :max="searchScore.max || 100"
      style="width: 100px"
    />
    <span>&nbsp;&nbsp;到&nbsp;&nbsp;</span>
    <!-- 最大值输入 -->
    <el-input
      v-model="searchScore.max"
      type="number"
      placeholder="最高分"
      :min="searchScore.min || 0"
      :max="100"
      style="width: 100px"
    />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="info" @click="clear">清空</el-button>
    </el-form-item>
  </el-form>
   </div>

  <!-- 功能按钮 -->
  <div class="container">
    <el-button type="primary" @click="addScore">+ 新增成绩</el-button>
    <el-button type="danger" @click="deleteByIds">- 批量删除</el-button>
  </div>

  <!-- 数据展示表格 -->
<div class="container">
  <el-table :data="scoreList" border style="width: 100%" @selection-change="handleSelectionChange">
  <el-table-column type="selection" width="55" align="center"/>
  <el-table-column prop="studentName" label="学生姓名" width="120" align="center"/>
  <el-table-column prop="courseName" label="课程名称" width="120" align="center"/>
  <el-table-column prop="teacherName" label="教师姓名" width="120" align="center"/>
  <el-table-column prop="regularScore" label="平时成绩" width="120" align="center"/>
  <el-table-column prop="examScore" label="期末成绩" width="120" align="center"/>
  <el-table-column prop="finalScore" label="总成绩" width="120" align="center"/>
  <el-table-column prop="createTime" label="创建时间" width="200" align="center"/>
  <el-table-column label="操作" align="center">
    <template #default="scope">
      <el-button type="primary" @click="edit(scope.row.id)"><el-icon><EditPen /></el-icon>编辑</el-button>
      <el-button type="danger" @click="deleteById(scope.row.id)"><el-icon><Delete /></el-icon>删除</el-button>
    </template>
  </el-table-column>
  </el-table>
</div>

<!-- 分页条 -->
<div class="container">
  <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20, 30,50,75,100]"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
</div>

<!-- 新增成绩/修改成绩对话框 -->
 <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-form :model="score" :rules="rules" ref="scoreFormRef" label-width="80px">
        <!-- 基本信息 -->
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="课程名称">
              <el-select v-model="score.courseId" placeholder="请选择课程" style="width: 100%;">
                <el-option v-for="c in courses" :key="c.id"  :label="c.name" :value="c.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="平时成绩" prop="regularScore">
              <el-input v-model.number="score.regularScore" placeholder="请输入平时成绩"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="期末成绩" prop="examScore">
              <el-input v-model.number="score.examScore" placeholder="请输入期末成绩"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      
      <!-- 底部按钮 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </span>
      </template>
  </el-dialog>
</template>

<style scoped>
h1 {
  margin: 20px 20px;
}

.container{
  margin: 20px 20px; 
}

.avatar {
  height: 40px;
}
.avatar-uploader .avatar {
  width: 78px;
  height: 78px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 78px;
  height: 78px;
  text-align: center;
  border-radius: 10px;
  /* 添加灰色的虚线边框 */
  border: 1px dashed var(--el-border-color);
}
</style>