<template>
  <div>
    <el-card shadow="never">
      <div>
        <div style="float: left">
          <i class="el-icon-search" ></i>
          <span style="margin-left: 5px">筛选搜索</span>
        </div>
       <div style="float: right">
         <el-button size="small" @click="handleResForm">重置</el-button>
         <el-button type="primary" size="small" @click="handleSearch">查询搜索</el-button>
       </div>
      </div>
      <el-form :inline="true" style="margin-top: 40px" align="left" :model="listQuery">
        <el-form-item label="输入搜索：" label-width="90px">
          <el-input size="small" placeholder="账号/姓名" v-model="listQuery.keyword"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never">
      <div style="float:left;">
        <i class="el-icon-tickets" style="margin-right: 5px"/>
        <span>数据列表</span>
      </div>
      <div style="float: right;padding-bottom: 10px">
        <el-button type="small" size="small" @click="handleAdd">添加</el-button>
      </div>
    </el-card>
    <el-table border :data="list">
      <el-table-column label="编号" align="center" prop="id"></el-table-column>
      <el-table-column label="账号" align="center" prop="username"></el-table-column>
      <el-table-column label="姓名" align="center" prop="nickName"></el-table-column>
      <el-table-column label="邮箱" align="center" prop="email"></el-table-column>
      <el-table-column label="添加时间" align="center">
        <template slot-scope="scope">{{scope.row.createTime | filterTime}}</template>
      </el-table-column>
      <el-table-column label="最后登录" align="center" >
        <template slot-scope="scope">{{scope.row.loginTime | filterTime}}</template>
      </el-table-column>
      <el-table-column label="是否启用" align="center">
        <template slot-scope="scope">
          <el-switch
            :inactive-value="0"
            :active-value="1"
            v-model="scope.row.status"
            @change="handleStatus(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
        <el-button type="text" @click="handleAlloc(scope.row)">分配角色</el-button>
        <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button type="text" @click="handleRemove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" style="float: right;margin-top: 10px">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20]"
        :current-page.sync="listQuery.pageNum"
        :total="total"
      >
      </el-pagination>
    </div>
    <div>
      <el-dialog title="添加用户" :visible.sync="showDialog" width="40%">
        <el-form label-width="150px" :model="admin">
          <el-form-item label="账号：">
            <el-input v-model="admin.username"></el-input>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input v-model="admin.nickName"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input v-model="admin.email"></el-input>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input v-model="admin.password" type="password"> </el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea" style="width: 200px;float: left" v-model="admin.note"></el-input>
          </el-form-item>
          <el-form-item label="是否启用：">
            <el-radio-group style="float: left;padding-top: 12px" v-model="admin.status">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button @click="showDialog = false">取消</el-button>
            <el-button type="primary" @click="handleDialogConfirm">确认</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div>
      <el-dialog title="分配用户" :visible.sync="allocDialogVisible" width="40%" close>
        <el-form>
          <el-form-item>
            <el-select multiple v-model="roleIds" placeholder="请选择" style="width: 500px">
              <el-option v-for="item in roleList" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <div style="float:right;margin-top: 10px">
            <el-button @click="allocDialogVisible = false">取消</el-button>
            <el-button @click="handleAllocDialog()" type="primary">确定</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import {adminList,updateStatus,createUser,getUser,updataUserInfo,removeUser,allocRole,adminRole} from '@/api/admin'
  import {roleList} from '@/api/role'
  import  {formatDate} from '@/utils/date'
  const defaultUMSAdmin = {
    id: null,
    username: null,
    password: null,
    nickName: null,
    email: null,
    note: null,
    status: 1
  }
  export default {
    data(){
      return{
        listQuery:{
          keyword:'',
          pageSize:10,
          pageNum:1
        },
        list:[],
        total:null,
        showDialog:false,
        allocDialogVisible:false,
        admin:Object.assign({},defaultUMSAdmin),
        isEdit:false,
        roleIds:[],
        roleList:[],
        userId:null
      }
    },
    created () {
      this.getList()
    },
    methods:{
      getList(){
        adminList(this.listQuery).then(response =>{
          this.list = response.data.list
          this.total = response.data.total
        })
      },
      handleSearch(){
        this.getList()
      },
      handleResForm(){
        this.listQuery.keyword = ''
      },
      handleStatus(row){
        updateStatus(row.id, {status: row.status}).then(response =>{
          this.$message({
            message:'修改成功',
            type:'success',
            duration:1000
          })
        })
      },
      handleAdd(){
        this.showDialog = true
        this.isEdit = false
        this.admin = defaultUMSAdmin
      },
      handleDialogConfirm(){
            if (this.isEdit){
              updataUserInfo(this.admin.id,this.admin).then(response =>{
                this.$message({
                  message:'修改成功',
                  type:'success',
                  duration:1000
                })
                this.getList()
              })
            }else {
              createUser(this.admin).then(response =>{
                this.$message({
                  message:'添加成功',
                  type:'success',
                  duration:1000
                })
                this.getList()
              })
            }
        this.showDialog = false

      },
      handleEdit(row){
        this.showDialog = true
        this.isEdit = true
        getUser(row.id).then(response =>{
          this.admin = response.data
        })
      },
      handleRemove(row){
        this.$confirm('确定要删除该用户?','提示',{
          cancelButtonText:'取消',
          confirmButtonText:'确定'
        }).then(() =>{
          removeUser(row.id).then(response => {
            this.$message({
              message:'删除成功',
              type:'success',
              duration:1000
            })
            this.getList()
          })
        })
      },
      handleAlloc(row){
        this.userId = row.id
        this.roleIds = []
        this.roleList = []
        adminRole(row.id).then(response =>{
          if (response.data!=null&&response.data.length>0){
            for (let i =0;i < response.data.length;i++){
              this.roleIds.push(response.data[i].id)
            }
          }
        })
        roleList().then(response =>{
          let list = response.data
          for (let i = 0;i < list.length;i++){
            this.roleList.push({label:list[i].name,value:list[i].id})
          }
          // console.log(this.roleList)
          this.allocDialogVisible = true
        })
      },
      handleAllocDialog(){
        let data = new URLSearchParams()
        data.append('adminId',this.userId)
        data.append('roleIds',this.roleIds)
        // console.log(this.roleIds)
        allocRole(data).then(response =>{
          this.$message({
            message:'分配成功',
            type:'success',
            duration:1000
          })
          this.allocDialogVisible = false
        })
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
    },
    filters:{
      filterTime(time){
          if(time == null || time ==='') return 'N/A'
          let data = new Date(time)
        return formatDate(data,'yyyy-MM-dd hh:mm:ss')
      }
    }
  }
</script>
<style scoped="scoped">
  .el-input{
    width: 200px;
    float: left;
  }
  .el-select{
    width: 200px;
    float: left;
  }
  .el-form-item{
    margin-left: 60px;
  }
  .el-card{
    margin-bottom: 20px;
  }

</style>
