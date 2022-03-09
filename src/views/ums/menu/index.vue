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
      <el-table-column label="菜单名称" prop="title"></el-table-column>
      <el-table-column label="菜单级数">
        <template slot-scope="scope">{{scope.row.level | filterLevel}}</template>
      </el-table-column>
      <el-table-column label="前端名称" prop="name"></el-table-column>
      <el-table-column label="是否显示">
       <template slot-scope="scope">
         <el-switch v-model="scope.row.hidden" :inactive-value="1"
                    :active-value="0" @change="handleStatus(scope.row)"></el-switch>
       </template>
      </el-table-column>
      <el-table-column label="排序" prop="sort"></el-table-column>
      <el-table-column label="设置">
        <template slot-scope="scope">
        <el-button type="text" @click="handleNextLevel(scope.row)" :disabled="disabled">查看下级</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleRemove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import {menuList,updateShowStatus,deleteMenu} from '@/api/menu'
  export default {
    data(){
      return{
        listQuery:{
          pageNum:1,
          pageSize:5,
        },
        parentId:0,
        list:[],
        total:null,
        disabled:false
      }
    },
    created () {
      this.getList()
    },
    methods:{
      getList(){
        menuList(this.parentId,this.listQuery).then(response =>{
          this.list = response.data.list
          this.total = response.data.total
        })
      },
      handleNextLevel(row){
        this.parentId = row.id
        this.getList()
        this.disabled = true
      },
      handleStatus(row){
        let data = new URLSearchParams()
        data.append('hidden',row.hidden)
        updateShowStatus(row.id,data).then(response =>{
          this.$message({
            message:'修改成功',
            type:'success',
            duration:1000
          })
          this.getList()
        })
      },
      handleAdd(){
        this.$router.push({path:'/ums/addMenu'})
      },
      handleEdit(row){
        this.$router.push({path:'/ums/editMenu',query:{menu:row}})
      },
      handleRemove(row){
        this.$confirm('确定删除?','提示',{
          cancelButtonText:'取消',
          confirmButtonText:'确定'
        }).then(()=>{
          deleteMenu(row.id).then(response=>{
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
      filterLevel(val){
        if (val === 0) return '一级'
        else return '二级'
      }
    }
  }
</script>
