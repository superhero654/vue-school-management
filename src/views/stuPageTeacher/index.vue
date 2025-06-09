<script setup>
import { ref,watch,onMounted } from 'vue';
import { queryPageApi,queryInfoApi } from '@/api/stuPageTeacher'
import { queryAllApi as queryAllCourseApi} from '@/api/course'

//元数据
//职位列表数据
const titles = ref([{ name: '教授', value: 1 },{ name: '副教授', value: 2 },{ name: '讲师', value: 3 },{ name: '企业教师', value: 4 },{ name: '其他', value: 5 }])
//性别列表数据
const genders = ref([{ name: '男', value: 1 }, { name: '女', value: 2 }])
//课程列表数据
const courses = ref([])

// 表单对象
const searchTeacher = ref({name:'',gender:'',data:[],begin:'',end:''});

watch(()=>searchTeacher.value.data,(newVal,oldVal)=>{
  if(newVal.length==2){
    searchTeacher.value.begin = newVal[0];
    searchTeacher.value.end = newVal[1];
  }else{
    searchTeacher.value.begin = '';
    searchTeacher.value.end = '';
  }
})

//钩子函数
onMounted(()=>{
  search();
  queryAllCourse();
})

//查询所有课程
const queryAllCourse = async ()=>{
  const result = await queryAllCourseApi();
  if(result.code){
    courses.value = result.data;
  }
}

// 查询
const search = async ()=>{
  const result = await queryPageApi(searchTeacher.value.name,searchTeacher.value.gender,searchTeacher.value.begin,searchTeacher.value.end,currentPage.value,pageSize.value);
  if(result.code){
    teacherList.value = result.data.rows;
    total.value = result.data.total;
  }
}

// 教师列表数据
const teacherList = ref([])

//分页
const currentPage = ref(1);
const pageSize = ref(10);
const background = ref(true);
const total = ref(0);

//每页展示记录数变化时触发
const handleSizeChange = (val) => {
  search();
}

//页码变化时触发
const handleCurrentChange = (val) => {
  search();
}

//查看表单
const teacher = ref({
    name: '',
    gender: '',
    phone: '',
    title: '',
    courseId: '',
    hireDate: '',
    exprList: []
})

// 控制弹窗
const dialogVisible = ref(false)
const dialogTitle = ref('教师详情')

//侦听
watch(()=>teacher.value.exprList,(newVal,oldVal)=>{
  if(teacher.value.exprList && teacher.value.exprList.length>0){
    teacher.value.exprList.forEach((expr)=>{
      expr.begin = expr.exprDate[0];
      expr.end = expr.exprDate[1];
    })
  }
},{deep:true})//深度侦听


//编辑
const details = async(id) => {
  const result = await queryInfoApi(id);
  if(result.code){
    dialogVisible.value = true;
    teacher.value = result.data;

    let exprList = teacher.value.exprList;
    if(exprList && exprList.length>0){
      exprList.forEach((expr)=>{
        expr.exprDate = [expr.begin,expr.end];
      }) 
    }
  }
}
</script>

<template>
  <h1>教师查看</h1>
  <!-- 数据展示表格 -->
<div class="container">
  <el-table :data="teacherList" border style="width: 100%" @selection-change="handleSelectionChange">
  <el-table-column type="index" label="序号" width="100" align="center"/>
  <el-table-column prop="name" label="姓名" width="150" align="center"/>
  <el-table-column prop="gender" label="性别" width="150" align="center">
    <template #default="scope">
      {{ scope.row.gender==1?'男':'女' }}
    </template>
  </el-table-column>
  <el-table-column prop="phone" label="手机号" width="240" align="center"/>
  <el-table-column prop="title" label="职位" width="200" align="center">
    <template #default="scope">
      <span v-if="scope.row.title==1">教授</span>
      <span v-else-if="scope.row.title==2">副教授</span>
      <span v-else-if="scope.row.title==3">讲师</span>
      <span v-else-if="scope.row.title==4">企业教师</span>
      <span v-else>其他</span>
    </template>
  </el-table-column>
  <el-table-column prop="courseName" label="所授课程" width="200" align="center"/>
  <el-table-column prop="hireDate" label="入职日期" width="200" align="center"/>
  <el-table-column label="操作" align="center">
    <template #default="scope">
      <el-button type="primary" @click="details(scope.row.id)"><el-icon><Search /></el-icon>查看</el-button>
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

<!-- 查看对话框 -->
 <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-form :model="teacher" label-width="80px" disabled>
        <!-- 基本信息 -->
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="teacher.name"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="性别" prop="gender">
              <el-select v-model="teacher.gender" style="width: 100%;">
                <el-option v-for="g in genders" :key="g.value" :label="g.name" :value="g.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="teacher.phone"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="职位">
              <el-select v-model="teacher.title" style="width: 100%;">
                <el-option v-for="t in titles" :key="t.value" :label="t.name" :value="t.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第三行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所授课程">
              <el-select v-model="teacher.courseId" style="width: 100%;">
                <el-option v-for="c in courses" :key="c.id"  :label="c.name" :value="c.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入职日期">
              <el-date-picker v-model="teacher.hireDate" type="date" style="width: 100%;" placeholder="选择日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 工作经历 -->
        <!-- 第四行 -->
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="工作经历">
            </el-form-item>
          </el-col>
        </el-row>
        
        <!-- 第五行 ...  工作经历 -->
        <el-row :gutter="3" v-for="(expr,index) in teacher.exprList">
          <el-col :span="10">
            <el-form-item size="small" label="时间" label-width="80px">
              <el-date-picker type="daterange" v-model="expr.exprDate" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD" ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="7">
            <el-form-item size="small" label="工作地点" label-width="60px">
              <el-input v-model="expr.site"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="7">
            <el-form-item size="small" label="职位" label-width="60px">
              <el-input v-model="expr.job"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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