<script setup>
import { ref,watch,onMounted } from 'vue';
import { queryPageApi,queryInfoApi } from '@/api/stuPageEmp'
import { queryAllApi as queryAllDeptApi} from '@/api/dept'

const dialogVisible = ref(false);
const dialogTitle = ref('职工详情');

//查看表单
const employee = ref({
  username: '',
  name: '',
  gender: '',
  phone: '',
  job: '',
  salary: '',
  deptId: '',
  entryDate: '',
  image: '',
  exprList: []
})

const details = async(id) => {
  const result = await queryInfoApi(id);
  if(result.code){
    dialogVisible.value = true;
    employee.value = result.data;

    let exprList = employee.value.exprList;
    if(exprList && exprList.length>0){
      exprList.forEach((expr)=>{
        expr.exprDate = [expr.begin,expr.end];
      }) 
    }
  }
}

//部门列表数据
const depts = ref([])

// 表单对象
const searchEmp = ref({name:'',gender:'',data:[],begin:'',end:''});

watch(()=>searchEmp.value.data,(newVal,oldVal)=>{
  if(newVal.length==2){
    searchEmp.value.begin = newVal[0];
    searchEmp.value.end = newVal[1];
  }else{
    searchEmp.value.begin = '';
    searchEmp.value.end = '';
  }
})

//钩子函数
onMounted(()=>{
  search();
  queryAllDept();
})

//查询所有部门
const queryAllDept = async ()=>{
  const result = await queryAllDeptApi();
  if(result.code){
    depts.value = result.data;
  }
}

// 查询
const search = async ()=>{
  const result = await queryPageApi(searchEmp.value.name,searchEmp.value.gender,searchEmp.value.begin,searchEmp.value.end,currentPage.value,pageSize.value);
  if(result.code){
    empList.value = result.data.rows;
    total.value = result.data.total;
  }
}

// 职工列表数据
const empList = ref([])

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

//侦听-emloyee员工对象中的工作经历信息
watch(()=>employee.value.exprList,(newVal,oldVal)=>{
  if(employee.value.exprList && employee.value.exprList.length>0){
    employee.value.exprList.forEach((expr)=>{
      expr.begin = expr.exprDate[0];
      expr.end = expr.exprDate[1];
    })
  }
},{deep:true})//深度侦听

</script>

<template>
  <h1>职工查看</h1>
  <!-- 数据展示表格 -->
<div class="container">
  <el-table :data="empList" border style="width: 100%" @selection-change="handleSelectionChange">
  <el-table-column type="index" label="序号" width="100" align="center"/>
  <el-table-column prop="name" label="姓名" width="240" align="center"/>
  <el-table-column prop="gender" label="性别" width="150" align="center">
    <template #default="scope">
      {{ scope.row.gender==1?'男':'女' }}
    </template>
  </el-table-column>
  <el-table-column prop="phone" label="手机号" width="240" align="center"/>
  <el-table-column prop="deptName" label="所属部门" width="200" align="center"/>
  <el-table-column prop="entryDate" label="入职日期" width="200" align="center"/>
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

 <!-- 查看职工消息信息对话框 -->
<el-dialog v-model="dialogVisible" :title="dialogTitle">
  <el-form :model="employee" ref="empFormRef" label-width="80px" disabled>
    <!-- 基本信息 -->
    <!-- 第一行 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="employee.name" disabled></el-input>
        </el-form-item>
      </el-col>
      
      <el-col :span="12">
        <el-form-item label="性别" prop="gender">
          <el-select v-model="employee.gender" style="width: 100%;" disabled>
            <el-option :label="employee.gender === 1 ? '男' : '女'" :value="employee.gender" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 第二行 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="employee.phone" disabled></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="所属部门">
          <el-select v-model="employee.deptId" style="width: 100%;" disabled>
            <el-option v-for="d in depts" :key="d.id"  :label="d.name" :value="d.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>  
    </el-row>

    <!-- 第三行 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="入职日期">
          <el-date-picker v-model="employee.entryDate" type="date" style="width: 100%;" disabled></el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 工作经历 -->
    <!-- 第四行 -->
    <el-row :gutter="10">
      <el-col :span="24">
        <el-form-item label="工作经历"></el-form-item>
      </el-col>
    </el-row>
    
    <!-- 第五行 ...  工作经历 -->
    <el-row :gutter="3" v-for="(expr,index) in employee.exprList" :key="index">
      <el-col :span="10">
        <el-form-item size="small" label="时间" label-width="80px">
          <el-date-picker type="daterange" v-model="expr.exprDate" range-separator="至" disabled></el-date-picker>
        </el-form-item>
      </el-col>

      <el-col :span="7">
        <el-form-item size="small" label="工作地点" label-width="60px">
          <el-input v-model="expr.site" disabled></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="7">
        <el-form-item size="small" label="职位" label-width="60px">
          <el-input v-model="expr.job" disabled></el-input>
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