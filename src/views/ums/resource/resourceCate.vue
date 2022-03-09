<template>
  <div>
  <el-card shadow="never">
    <div style="float:left;">
      <i class="el-icon-tickets" style="margin-right: 5px"/>
      <span>数据列表</span>
    </div>
    <div style="float: right;padding-bottom: 10px">
      <el-button type="small" size="small" @click="handleAdd">添加</el-button>
    </div>
  </el-card>
  <el-table border :data="list" style="margin-top: 20px">
    <el-table-column label="编号" prop="id"></el-table-column>
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="创建时间">
      <template slot-scope="scope">{{scope.row.createTime | filterTime}}</template>
    </el-table-column>
    <el-table-column label="排序" prop="sort"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
      <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
      <el-button type="text" @click="handleRemove(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-dialog title="添加分类" :visible.sync="showDialog" width="40%">
      <el-form label-width="150px" :model="cate">
        <el-form-item label="名称：">
          <el-input v-model="cate.name"></el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="cate.sort"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="handleDialogConfirm">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import {listAllCate,addResourceCategory,updateCate,deleteCate} from '@/api/resourceCate'
  import  {formatDate} from '@/utils/date'
  const defultCate = {
    name:null,
    sort:0,
  }
  export default {
    data(){
      return{
        list:[],
      showDialog:false,
        cate:Object.assign({},defultCate),
        isEdit:false,
        cateId:null
      }
    },
    created () {
      this.getList()
    },
    methods:{
      getList(){
        listAllCate().then(response =>{
          this.list = response.data
        })
      },
      handleAdd(){
        this.isEdit = false
        this.showDialog = true
      },
      handleDialogConfirm(){
      if (this.isEdit){
        updateCate(this.cateId,this.cate).then(response =>{
          this.$message({
            message:'添加成功',
            type:'success',
            duration:1000
          })
          this.getList()
        })
        this.showDialog = false
      }else{
        addResourceCategory(this.cate).then(response =>{
          this.$message({
            message:'添加成功',
            type:'success',
            duration:1000
          })
          this.getList()
        })
        this.showDialog = false
      }

      },
      handleEdit(row){
        this.isEdit = true
        this.cateId = row.id
        this.cate =  Object.assign({},row)
        this.showDialog = true
      },
      handleRemove(row){
        this.$confirm('确定删除?','提示',{
          cancelButtonText:'取消',
          confirmButtonText:'确定'
        }).then(()=>{
          deleteCate(row.id).then(response =>{
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
