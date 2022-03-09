<template>
  <div class="productAttr">
    <el-card shadow="never">
      <div class="top" style="float: left">
        <el-icon class="el-icon-s-order"></el-icon>
        <span style="margin-left: 5px">数据列表</span>
      </div>
      <el-button size="small" style="float: right;margin-bottom: 13px"
               @click="handleAddAttr" >添加</el-button>
    </el-card>
    <el-table border :data="list" style="width: 100%;margin-top: 20px">
      <el-table-column label="编号" align="center" width="50">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column label="类型名称" align="center">
        <template slot-scope="scope">{{scope.row.name}}</template>
      </el-table-column>
      <el-table-column label="属性数量" align="center">
        <template slot-scope="scope">{{scope.row.attributeCount}}</template>
      </el-table-column>
      <el-table-column label="参数数量" align="center">
        <template slot-scope="scope">{{scope.row.paramCount}}</template>
      </el-table-column>
      <el-table-column label="设置" align="center" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleAttrList(scope.row)">属性列表</el-button>
          <el-button size="mini" @click="handleParamsList(scope.row)">参数列表</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" style="float: right">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total"
      >
      </el-pagination>
    </div>
    <div>
      <el-dialog title="添加类型"
                  width="30%"
                :visible="addDilogvisible">
        <span>
        <el-form>
          <el-form-item label="类型名称：">
            <el-input v-model="addAttrCateName" style="width: 60%;float:left;"></el-input>
          </el-form-item>
        </el-form>
          <el-button @click="addDilogvisible = false">取 消</el-button>
          <el-button type="primary" @click="addAttrSubmit">确定</el-button>
          </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import {fetchList,addAttrCate,deleteAttrCate} from '@/api/productAttrCate'
  export default {
    data(){
      return{
        listQuery:{
          pageNum:1,
          pageSize:5,
        },
        list:[],
        total:null,
        addDilogvisible:false,
        addAttrCateName:''
      }
    },
    created () {
    this.getList()
      },
    methods:{
      getList(){
        fetchList(this.listQuery).then(response =>{
          this.list = response.data.list
          this.total = response.data.total
        })
      },
      handleSizeChange(val){
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val){
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleAddAttr(){
        this.addAttrCateName = ''
        this.addDilogvisible = true
      },
      addAttrSubmit(){
        let data = new URLSearchParams()
         data.append('name',this.addAttrCateName)
        addAttrCate(data).then(response =>{
          this.addDilogvisible = false;
          this.getList()
        })
      },
      handleAttrList(row){
          this.$router.push({path:'/pms/productAttrList',query:{pid:row.id,cname:row.name,type:0}})
      },
      handleParamsList(row){
        this.$router.push({path:'/pms/productAttrList',query:{pid:row.id,cname:row.name,type:1}})
      },
      handleUpdate(row){
        this.addAttrCateName = row.name
        this.addDilogvisible = true;
      },
      handleDelete(row){
        this.$confirm('确认删除？','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(() =>{
          let data = new URLSearchParams()
          data.append('ids',row.id)
          deleteAttrCate(row.id).then(response =>{
            this.$message({
              message:'删除成功',
              type:'success',
              duration:1000
            })
            this.getList()
          })
        })
      }
    }
  }
</script>
