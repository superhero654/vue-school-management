<script setup>
import { ref,watch,onMounted } from 'vue';
import { queryPageApi,addApi,queryInfoApi,updateApi,deleteApi } from '@/api/teacher'
import { queryAllApi as queryAllCourseApi} from '@/api/course'
import { ElMessage,ElMessageBox } from 'element-plus';

//元数据
//职位列表数据
const titles = ref([{ name: '教授', value: 1 },{ name: '副教授', value: 2 },{ name: '讲师', value: 3 },{ name: '企业教师', value: 4 },{ name: '其他', value: 5 }])
//性别列表数据
const genders = ref([{ name: '男', value: 1 }, { name: '女', value: 2 }])
//课程列表数据
const courses = ref([])

// 搜素表单对象
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

// 清空
const clear = ()=>{
  searchTeacher.value = {name:'',gender:'',data:[],begin:'',end:''};
  search();
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

//新增教师
const addTeacher = ()=>{
  dialogVisible.value = true;
  dialogTitle.value = '新增教师';
  teacher.value = {
    name: '',
    gender: '',
    phone: '',
    title: '',
    courseId: '',
    hireDate: '',
    exprList: []
  }
  //重置表单
  if(teacherFormRef.value){
    teacherFormRef.value.resetFields();
  }
}

//新增/修改表单
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
const dialogTitle = ref('新增教师')

//添加工作经历
const addExprItem = () => {
  teacher.value.exprList.push({site:'',job:'',begin:'',end:'',exprDate:[]})
}

//删除工作经历
const delExprItem = (index) => {
  teacher.value.exprList.splice(index,1)
}

//侦听
watch(()=>teacher.value.exprList,(newVal,oldVal)=>{
  if(teacher.value.exprList && teacher.value.exprList.length>0){
    teacher.value.exprList.forEach((expr)=>{
      expr.begin = expr.exprDate[0];
      expr.end = expr.exprDate[1];
    })
  }
},{deep:true})//深度侦听

//保存
const save = async () => { 
if(!teacherFormRef.value){
    return; 
  }
  teacherFormRef.value.validate(async (valid) => {
    if(valid){
      let result;
      if(teacher.value.id){
        result = await updateApi(teacher.value);
      }else{ 
        result = await addApi(teacher.value);
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

//表单引用
const teacherFormRef = ref();

//表单校验规则
const rules = ref({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '姓名长度应在2到10个字符之间', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号', trigger: 'blur' }//正则表达式验证手机号
  ]
});

//编辑
const edit = async(id) => {
  const result = await queryInfoApi(id);
  if(result.code){
    dialogVisible.value = true;
    dialogTitle.value = '修改教师';
    teacher.value = result.data;

    let exprList = teacher.value.exprList;
    if(exprList && exprList.length>0){
      exprList.forEach((expr)=>{
        expr.exprDate = [expr.begin,expr.end];
      }) 
    }
  }
}

//删除教师
const deleteById = (id) => {
    ElMessageBox.confirm('你确认删除该教师吗?','提示',
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

//记录勾选教师的id
const selectedIds = ref([]);
//复选框勾选发生变化时，触发 -selection为当前选中的行数据(数组)
const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map( item => item.id);
}

//批量删除
const deleteByIds = () => {
    ElMessageBox.confirm('你确认删除该教师吗?','提示',
      {confirmButtonText: '确认',cancelButtonText: '取消',type: 'warning'}
    ).then(async() => {//点击确认按钮
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
  <h1>教师管理</h1>
  <!-- 搜索栏 -->
   <div class="container">
    <el-form :inline="true" :model="searchTeacher" class="demo-form-inline">
    <el-form-item label="姓名">
      <el-input v-model="searchTeacher.name" placeholder="请输入教师姓名" clearable />
    </el-form-item>

    <el-form-item label="性别">
      <el-select v-model="searchTeacher.gender" placeholder="请选择" clearable>
        <el-option label="男" value="1" />
        <el-option label="女" value="2" />
      </el-select>
    </el-form-item>
    <el-form-item label="入职时间">
      <el-date-picker
        v-model="searchTeacher.data"
        type="daterange"
        range-separator="到"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="YYYY-MM-DD"
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
    <el-button type="primary" @click="addTeacher">+ 新增教师</el-button>
    <el-button type="danger" @click="deleteByIds">- 批量删除</el-button>
  </div>

  <!-- 数据展示表格 -->
<div class="container">
  <el-table :data="teacherList" border style="width: 100%" @selection-change="handleSelectionChange">
  <el-table-column type="selection" width="55" align="center"/>
  <el-table-column prop="name" label="姓名" width="120" align="center"/>
  <el-table-column prop="gender" label="性别" width="120" align="center">
    <template #default="scope">
      {{ scope.row.gender==1?'男':'女' }}
    </template>
  </el-table-column>
  <el-table-column prop="phone" label="手机号" width="180" align="center"/>
  <el-table-column prop="title" label="职位" width="180" align="center">
    <template #default="scope">
      <span v-if="scope.row.title==1">教授</span>
      <span v-else-if="scope.row.title==2">副教授</span>
      <span v-else-if="scope.row.title==3">讲师</span>
      <span v-else-if="scope.row.title==4">企业教师</span>
      <span v-else>其他</span>
    </template>
  </el-table-column>
  <el-table-column prop="courseName" label="所授课程" width="120" align="center"/>
  <el-table-column prop="hireDate" label="入职日期" width="180" align="center"/>
  <el-table-column prop="updateTime" label="最后操作时间" width="200" align="center"/>
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

<!-- 新增员工/修改员工对话框 -->
 <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-form :model="teacher" :rules="rules" ref="teacherFormRef" label-width="80px">
        <!-- 基本信息 -->
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="teacher.name" placeholder="请输入教师姓名,2-10个字"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="性别" prop="gender">
              <el-select v-model="teacher.gender" placeholder="请选择性别" style="width: 100%;">
                <el-option v-for="g in genders" :key="g.value" :label="g.name" :value="g.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="teacher.phone" placeholder="请输入教师手机号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="职位">
              <el-select v-model="teacher.title" placeholder="请选择职位" style="width: 100%;">
                <el-option v-for="t in titles" :key="t.value" :label="t.name" :value="t.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第三行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所授课程">
              <el-select v-model="teacher.courseId" placeholder="请选择课程" style="width: 100%;">
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
              <el-button type="success" size="small" @click="addExprItem">+ 添加工作经历</el-button>
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

          <el-col :span="6">
            <el-form-item size="small" label="工作地点" label-width="60px">
              <el-input placeholder="请输入工作地点名称" v-model="expr.site"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item size="small" label="职位" label-width="60px">
              <el-input placeholder="请输入职位" v-model="expr.job"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="2">
            <el-form-item size="small" label-width="0px">
              <el-button type="danger" @click="delExprItem(index)">- 删除</el-button>
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