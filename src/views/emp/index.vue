<script setup>
import { ref,watch,onMounted } from 'vue';
import { queryPageApi,addApi,queryInfoApi,updateApi,deleteApi } from '@/api/emp'
import { queryAllApi as queryAllDeptApi} from '@/api/dept'
import { ElMessage,ElMessageBox } from 'element-plus';

//元数据
//性别列表数据
const genders = ref([{ name: '男', value: 1 }, { name: '女', value: 2 }])
//部门列表数据
const depts = ref([])

// 搜素表单对象
const searchEmp = ref({name:'',gender:'',data:[],begin:'',end:''});

// 监听searchEmp的data属性，当data属性发生变化时，执行search方法
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
  search();//查询所有职工列表数据
  queryAllDept();//查询所有部门数据
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

// 清空
const clear = ()=>{
  searchEmp.value = {name:'',gender:'',data:[],begin:'',end:''};
  search();
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

//新增职工
const addEmp = ()=>{
  dialogVisible.value = true;
  dialogTitle.value = '新增职工';
  employee.value = {
    name: '',
    gender: '',
    phone: '',
    salary: '',
    deptId: '',
    entryDate: '',
    exprList: []
  }
  //重置表单
  if(empFormRef.value){
    empFormRef.value.resetFields();
  }
}

//新增/修改表单
const employee = ref({
  name: '',
  gender: '',
  phone: '',
  salary: '',
  deptId: '',
  entryDate: '',
  exprList: []
})

// 控制弹窗
const dialogVisible = ref(false)
const dialogTitle = ref('新增职工')

//添加工作经历
const addExprItem = () => {
  employee.value.exprList.push({company:'',job:'',begin:'',end:'',exprDate:[]})
}

//删除工作经历
const delExprItem = (index) => {
  employee.value.exprList.splice(index,1)
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

//保存
const save = async () => { 
  //表单校验
if(!empFormRef.value){
    return; 
  }
  empFormRef.value.validate(async (valid) => {//valid表示是否通过校验
    if(valid){
      let result;
      if(employee.value.id){//修改
        result = await updateApi(employee.value);
      }else{ //新增
        result = await addApi(employee.value);
      }

      if(result.code){
        ElMessage.success('保存成功'); 
        dialogVisible.value = false;
        search();
      }else{
        ElMessage.error(result.msg);
      }
    }else{
      //提示信息
        ElMessage.error("表单校验不通过");
    }
  })
}

//表单引用
const empFormRef = ref();

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
    dialogTitle.value = '修改职工';
    employee.value = result.data;

    //对工作经历进行处理
    let exprList = employee.value.exprList;
    if(exprList && exprList.length>0){
      exprList.forEach((expr)=>{
        expr.exprDate = [expr.begin,expr.end];
      }) 
    }
  }
}

//删除职工
const deleteById = (id) => {
 //弹出确认框
    ElMessageBox.confirm('你确认删除该职工吗?','提示',
      {confirmButtonText: '确认',cancelButtonText: '取消',type: 'warning'}
    ).then(async() => {//点击确认按钮
      const result = await deleteApi(id);
      if(result.code){
        //提示信息
        ElMessage.success("删除成功");
        //刷新列表
        search();
      }else{
        //提示信息
        ElMessage.error(result.msg);
      }
    })
    .catch(() => {//点击取消按钮
      ElMessage({
        type: 'info',
        message: '你已取消删除'
      })
    }) 
}

//记录勾选职工的id
const selectedIds = ref([]);
//复选框勾选发生变化时，触发 -selection为当前选中的行数据(数组)
const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map( item => item.id);
}

//批量删除
const deleteByIds = () => {
  //弹出确认框
    ElMessageBox.confirm('你确认删除该职工吗?','提示',
      {confirmButtonText: '确认',cancelButtonText: '取消',type: 'warning'}
    ).then(async() => {//点击确认按钮
      if(selectedIds.value && selectedIds.value.length > 0){
        const result = await deleteApi(selectedIds.value);
        if(result.code){
          //提示信息
          ElMessage.success("删除成功");
          //刷新列表
          search();
        }else{
          //提示信息
          ElMessage.error(result.msg);
        }
      }else{//没有选中任何数据
        ElMessage.info("没有选择要删除的数据");
      }
    }).catch(() => {//点击取消按钮
      ElMessage({
        type: 'info',
        message: '你已取消删除'
      })
    }) 
}
    
</script>

<template>
  <h1>职工管理</h1>
  <!-- 搜索栏 -->
   <div class="container">
    <el-form :inline="true" :model="searchEmp" class="demo-form-inline">
    <el-form-item label="姓名">
      <el-input v-model="searchEmp.name" placeholder="请输入职工姓名" clearable />
    </el-form-item>

    <el-form-item label="性别">
      <el-select v-model="searchEmp.gender" placeholder="请选择" clearable>
        <el-option label="男" value="1" />
        <el-option label="女" value="2" />
      </el-select>
    </el-form-item>
    <el-form-item label="入职时间">
      <el-date-picker
        v-model="searchEmp.data"
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
    <el-button type="primary" @click="addEmp">+ 新增职工</el-button>
    <el-button type="danger" @click="deleteByIds">- 批量删除</el-button>
  </div>

  <!-- 数据展示表格 -->
<div class="container">
  <el-table :data="empList" border style="width: 100%" @selection-change="handleSelectionChange">
  <el-table-column type="selection" width="55" align="center"/>
  <el-table-column prop="name" label="姓名" width="120" align="center"/>
  <el-table-column prop="gender" label="性别" width="120" align="center">
    <template #default="scope">
      {{ scope.row.gender==1?'男':'女' }}
    </template>
  </el-table-column>
  <el-table-column prop="phone" label="手机号" width="180" align="center"/>
  <el-table-column prop="salary" label="薪资" width="180" align="center"/>
  <el-table-column prop="deptName" label="所属部门" width="120" align="center"/>
  <el-table-column prop="entryDate" label="入职日期" width="180" align="center"/>
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
      <el-form :model="employee" :rules="rules" ref="empFormRef" label-width="80px">
        <!-- 基本信息 -->
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="employee.name" placeholder="请输入职工姓名,2-10个字"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="性别" prop="gender">
              <el-select v-model="employee.gender" placeholder="请选择性别" style="width: 100%;">
                <el-option v-for="g in genders" :key="g.value" :label="g.name" :value="g.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="employee.phone" placeholder="请输入职工手机号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="薪资">
              <el-input v-model="employee.salary" placeholder="请输入职工薪资"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第三行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所属部门">
              <el-select v-model="employee.deptId" placeholder="请选择部门" style="width: 100%;">
                <el-option v-for="d in depts" :key="d.id"  :label="d.name" :value="d.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入职日期">
              <el-date-picker v-model="employee.entryDate" type="date" style="width: 100%;" placeholder="选择日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD"></el-date-picker>
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
        <el-row :gutter="3" v-for="(expr,index) in employee.exprList">
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