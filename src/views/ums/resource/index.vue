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
      <el-form :inline="true" style="margin-top: 50px" align="left" :model="listQuery">
        <el-form-item label="资源名称：" label-width="90px">
          <el-input size="small" placeholder="资源名称" v-model="listQuery.nameKeyword"></el-input>
        </el-form-item>
        <el-form-item label="资源路径："  label-width="90px" >
          <el-input v-model="listQuery.urlKeyword" size="small" placeholder="资源路径"></el-input>
        </el-form-item>
        <el-form-item label="资源分类："  label-width="90px">
          <el-select size="small" placeholder="资源分类" v-model="listQuery.categoryId" clearable>
            <el-option v-for="item in resourceCateList" :key="item.id"
                       :value="item.id"
                       :label="item.name"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never">
      <div style="float:left;">
        <i class="el-icon-tickets" style="margin-right: 5px"/>
        <span>数据列表</span>
      </div>
      <div style="float: right;padding-bottom: 10px">
        <el-button type="small" @click="handleCata()">资源分类</el-button>
        <el-button type="small" size="small" @click="handleAdd">添加</el-button>
      </div>
    </el-card>
    <el-table border :data="list">
      <el-table-column label="编号" prop="id"></el-table-column>
      <el-table-column label="资源名称" prop="name"></el-table-column>
      <el-table-column label="资源路径" prop="url"></el-table-column>
      <el-table-column label="描述" prop="description"></el-table-column>
      <el-table-column label="添加时间">
        <template slot-scope="scope">{{scope.row.createTime | filterTime}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
        <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button type="text" @click="handleRemove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" style="float: right;">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20]"
        :total="total">
      </el-pagination>
    </div>
    <div>
      <el-dialog title="添加资源" :visible.sync="showDialog" width="40%">
        <el-form label-width="150px" :model="resource">
          <el-form-item label="资源名称：">
            <el-input v-model="resource.name"></el-input>
          </el-form-item>
          <el-form-item label="资源路径：">
            <el-input v-model="resource.url"></el-input>
          </el-form-item>
          <el-form-item label="资源分类：">
            <el-select size="small" placeholder="资源分类" v-model="resource.categoryId" clearable>
              <el-option v-for="item in resourceCateList" :key="item.id"
                         :value="item.id"
                         :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述：">
            <el-input v-model="resource.description" type="textarea" :rows="5"
                      style="width: 250px;float: left"></el-input>
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
  import {fetchAllResourceList,addResource,updateResource,deleteResource} from '@/api/resource'
  import  {formatDate} from '@/utils/date'
  import {listAllCate} from '@/api/resourceCate'
  const defaultListQuery = {
    categoryId:null,
    nameKeyword:'',
    pageNum:1,
    pageSize:10,
    urlKeyword:''
  }
  const defaultResource = {
    categoryId:null,
    description:null,
    name:null,
    url:null
  }
  export default {
    data(){
      return{
        listQuery:Object.assign({},defaultListQuery),
        list:[],
        total:null,
        resourceCateList:[],
        resource:Object.assign({},defaultResource),
        showDialog:false,
        isEdit:false,
        resourceId:null
      }
    },
    created () {
    this.getList()
      this.getResourceCate()
      },
    methods:{
      getList(){
        fetchAllResourceList(this.listQuery).then(response =>{
          console.log(response)
          this.list = response.data.list
          this.total = response.data.total
        })
      },
      getResourceCate(){
        listAllCate().then(response=>{
          this.resourceCateList = response.data
        })
      },
      handleResForm(){
          this.listQuery = defaultListQuery
      },
      handleSearch(){
        console.log(this.listQuery)
        this.getList()
      },
      handleSizeChange(val){
        this.listQuery.pageSize = val
        this.listQuery.pageNum = 1
        this.getList()
      },
      handleCurrentChange(val){
        this.listQuery.pageNum = val
        this.getList()
      },
      handleCata(){
        this.$router.push({path:'/ums/ResourceCate'})
      },
      handleAdd(){
        this.showDialog = true
        this.isEdit = false
      },
      handleEdit(row){
        this.isEdit = true
        this.resource = Object.assign({},row)
        this.showDialog = true
        this.resourceId = row.id
      },
      handleDialogConfirm(){
        if (this.isEdit){
          updateResource(this.resourceId,this.resource).then(response =>{
            this.$message({
              message:'修改成功',
              type:'success',
              duration:1000
            })
            this.showDialog = false
            this.getList()
          })
        }else{
          addResource(this.resource).then(response =>{
            this.$message({
              message:'添加成功',
              type:'success',
              duration:1000
            })
            this.showDialog = false
            this.getList()
          })
        }
      },
      handleRemove(row){
        this.$confirm('确定删除？','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消'
        }).then(() =>{
          deleteResource(row.id).then(response =>{
            this.$message({
              message:'删除成功',
              type:'success',
              duration:1000
            })
            this.getList()
          })
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
    margin-top: 20px;
  }
  .el-table{
    margin-top: 20px;
  }
</style>
