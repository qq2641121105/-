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
          <el-input size="small" placeholder="角色名称" v-model="listQuery.keyword"></el-input>
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
      <el-table-column label="角色名称" align="center" prop="name"></el-table-column>
      <el-table-column label="描述" align="center" prop="description"></el-table-column>
      <el-table-column label="用户数" align="center" prop="adminCount"></el-table-column>
      <el-table-column label="添加时间" align="center">
        <template slot-scope="scope">{{scope.row.createTime | filterTime}}</template>
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
          <el-button type="text" @click="handleAllocMenu(scope.row)" size="small">分配菜单</el-button>
          <el-button type="text" @click="handleAllocResource(scope.row)" size="small">分配资源</el-button>
          <el-button type="text" @click="handleEdit(scope.row)" size="small">编辑</el-button>
          <el-button type="text" @click="handleRemove(scope.row)" size="small">删除</el-button>
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
      <el-dialog title="添加角色" :visible.sync="showDialog" width="40%">
        <el-form label-width="150px" :model="role">
          <el-form-item label="角色名称：">
            <el-input v-model="role.name"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea" style="width: 200px;float: left" v-model="role.description"></el-input>
          </el-form-item>
          <el-form-item label="是否启用：">
            <el-radio-group style="float: left;padding-top: 12px" v-model="role.status">
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

  </div>
</template>
<script>
  import {fecthList,updateStatus,createRole,updateRoleInfo,getRoleInfo,removeRole} from '@/api/role'
  import  {formatDate} from '@/utils/date'
  const roledefault = {
    adminCount: null,
    createTime: null,
    description: null,
    id: null,
    name: null,
    sort: null,
    status: 1
  }
  export default {
    data(){
      return{
        list:[],
        listQuery:{
          pageNum:1,
          pageSize:10,
          keyword:''
        },
        total:null,
        role:Object.assign({},roledefault),
        showDialog:false,
        isEdit:false
      }
    },
    created () {
    this.getList()
      },
    methods:{
      getList(){
        fecthList(this.listQuery).then(response =>{
          this.list = response.data.list
          this.total = response.data.total
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
        this.role = roledefault
      },
      handleDialogConfirm(){
        if (this.isEdit){
          updateRoleInfo(this.role.id,this.role).then(response =>{
            this.$message({
              message:'修改成功',
              type:'success',
              duration:1000
            })
            this.getList()
          })
        }else {
          createRole(this.role).then(response =>{
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
        this.role = Object.assign({},row)
      },
      handleAllocMenu(row){
        this.$router.push({path:'/ums/allocMenu',query:{id:row.id}})
      },
      handleAllocResource(row){
        this.$router.push({path:'/ums/allocResource',query:{id:row.id}})
      },
      handleRemove(row){
        let ids = []
        ids.push(row.id)
        let data = new URLSearchParams()
        data.append('ids',ids)
        this.$confirm('确定删除该角色?','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消'
        }).then(() =>{
          removeRole(data).then(response =>{
            this.$message({
              message:'删除成功',
              type:'success',
              duration:10000
            })
          })
          this.getList()
        })
      }
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
