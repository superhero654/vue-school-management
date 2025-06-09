<script setup>
import { ref,watch,onMounted } from 'vue';
import { queryPageApi,addApi,queryInfoApi,updateApi,deleteApi } from '@/api/student'
import { queryAllApi as queryAllClazzApi} from '@/api/clazz'
import { ElMessage,ElMessageBox } from 'element-plus';

//元数据
//性别列表数据
const genders = ref([{ name: '男', value: 1 }, { name: '女', value: 2 }])
//班级列表数据
const clazzs = ref([])


// 搜素表单对象
const searchStudent = ref({name:'',gender:'',data:[],begin:'',end:''});

watch(()=>searchStudent.value.data,(newVal,oldVal)=>{
  if(newVal.length==2){
    searchStudent.value.begin = newVal[0];
    searchStudent.value.end = newVal[1];
  }else{
    searchStudent.value.begin = '';
    searchStudent.value.end = '';
  }
})

//钩子函数
onMounted(() => {
  queryAllClazz(); 
  search(); 
});

//查询所有班级
const queryAllClazz = async ()=>{
  const result = await queryAllClazzApi();
  if(result.code){
    clazzs.value = result.data;
  }
}

// 查询
const search = async ()=>{
  const result = await queryPageApi(searchStudent.value.name,searchStudent.value.gender,searchStudent.value.begin,searchStudent.value.end,currentPage.value,pageSize.value);
  if(result.code){
    studentList.value = result.data.rows;
    total.value = result.data.total;
  }
}

// 清空
const clear = ()=>{
  searchStudent.value = {name:'',gender:'',data:[],begin:'',end:''};
  search();
}

// 学生列表数据
const studentList = ref([])

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

//新增学生
const addStudent = ()=>{
  dialogVisible.value = true;
  dialogTitle.value = '新增学生';
  student.value = {
    username: '',
    password: '123456',
    name: '',
    gender: '',
    phone: '',
    email: '',
    clazzId: '',
    admissionDate: ''
  }
  //重置表单
  if(studentFormRef.value){
    studentFormRef.value.resetFields();
  }
}

//新增/修改表单
const student = ref({
    username: '',
    password: '123456',
    name: '',
    gender: '',
    phone: '',
    email: '',
    clazzId: '',
    admissionDate: ''
})

// 控制弹窗
const dialogVisible = ref(false)
const dialogTitle = ref('新增学生')

//保存
const save = async () => { 
  //表单校验
if(!studentFormRef.value){
    return; 
  }
  studentFormRef.value.validate(async (valid) => {//valid表示是否通过校验
    if(valid){
      let result;
      if(student.value.id){
        result = await updateApi(student.value);
      }else{ 
        result = await addApi(student.value);
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
const studentFormRef = ref();

//表单校验规则
const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度应在2到20个字符之间', trigger: 'blur' }
  ],
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
    dialogTitle.value = '修改学生';
    student.value = result.data;
  }
}

//删除学生
const deleteById = (id) => {
    ElMessageBox.confirm('你确认删除该学生吗?','提示',
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

//记录勾选学生的id
const selectedIds = ref([]);

const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map( item => item.id);
}

//批量删除
const deleteByIds = () => {
    ElMessageBox.confirm('你确认删除该学生吗?','提示',
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
  <h1>学生管理</h1>
  <!-- 搜索栏 -->
   <div class="container">
    <el-form :inline="true" :model="searchStudent" class="demo-form-inline">
    <el-form-item label="姓名">
      <el-input v-model="searchStudent.name" placeholder="请输入学生姓名" clearable />
    </el-form-item>

    <el-form-item label="性别">
      <el-select v-model="searchStudent.gender" placeholder="请选择" clearable>
        <el-option label="男" value="1" />
        <el-option label="女" value="2" />
      </el-select>
    </el-form-item>
    <el-form-item label="入学时间">
      <el-date-picker
        v-model="searchStudent.data"
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
    <el-button type="primary" @click="addStudent">+ 新增学生</el-button>
    <el-button type="danger" @click="deleteByIds">- 批量删除</el-button>
  </div>

  <!-- 数据展示表格 -->
<div class="container">
  <el-table :data="studentList" border style="width: 100%" @selection-change="handleSelectionChange">
  <el-table-column type="selection" width="55" align="center"/>
  <el-table-column prop="name" label="姓名" width="120" align="center"/>
  <el-table-column prop="gender" label="性别" width="120" align="center">
    <template #default="scope">
      {{ scope.row.gender==1?'男':'女' }}
    </template>
  </el-table-column>
  <el-table-column prop="clazzName" label="班级" width="120" align="center"/>
  <el-table-column prop="phone" label="电话" width="150" align="center"/>
  <el-table-column prop="email" label="邮箱" width="200" align="center"/>
  <el-table-column prop="admissionDate" label="入学日期" width="180" align="center"/>
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

<!-- 新增学生/修改学生对话框 -->
 <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-form :model="student" :rules="rules" ref="studentFormRef" label-width="80px">
        <!-- 基本信息 -->
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="student.username" placeholder="请输入学生用户名,2-20个字"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="student.name" placeholder="请输入学生姓名,2-10个字"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="性别" prop="gender">
              <el-select v-model="student.gender" placeholder="请选择性别" style="width: 100%;">
                <el-option v-for="g in genders" :key="g.value" :label="g.name" :value="g.value"></el-option>

              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="student.phone" placeholder="请输入学生手机号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第三行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="班级">
              <el-select v-model="student.clazzId" placeholder="请选择班级" style="width: 100%;">
                <el-option v-for="c in clazzs" :key="c.id"  :label="c.name" :value="c.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入学日期">
              <el-date-picker v-model="student.admissionDate" type="date" style="width: 100%;" placeholder="选择日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第四行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="电子邮箱" prop="email">
              <el-input v-model="student.email" placeholder="请输入学生电子邮箱"></el-input>
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