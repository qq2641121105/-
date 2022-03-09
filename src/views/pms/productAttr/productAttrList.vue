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
      <el-table-column label="属性名称" align="center">
        <template slot-scope="scope">{{scope.row.name}}</template>
      </el-table-column>
      <el-table-column label="商品类型" align="center">
        <template>{{$route.query.cname}}</template>
      </el-table-column>
      <el-table-column label="属性是否可选" align="center">
        <template slot-scope="scope">{{scope.row.selectType | filterSelectType}}</template>
      </el-table-column>
      <el-table-column label="属性值的录入方式" align="center">
        <template slot-scope="scope">{{scope.row.inputType | filterInputType}}</template>
      </el-table-column>
      <el-table-column label="可选值列表" align="center">
        <template slot-scope="scope">{{scope.row.inputList}}</template>
      </el-table-column>
      <el-table-column label="排序" align="center">
        <template slot-scope="scope">{{scope.row.sort}}</template>
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
  </div>
</template>
<script>
  import {fetchList,deleteProductAttr} from '@/api/productAttr'
  export default {
    data(){
      return{
        listQuery:{
          pageSize:5,
          pageNum:1,
          type:0
        },
        list:[],
        total:null
      }
    },
    created () {
    this.getList()
      },
    methods:{
      getList(){
        this.listQuery.type = Number(this.$route.query.type)
        fetchList(this.$route.query.pid,this.listQuery).then(response =>{
          this.list = response.data.list
          this.total  = response.data.total
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
        this.$router.push({path:'/pms/addproductAttr',query:{type:this.$route.query.type}})
      },
      handleUpdate(row){
        this.$router.push({path:'/pms/updateProductAttr',query:{id:row.id,type:this.$route.query.type}})
      },
      handleDelete(row){
        this.$confirm('确认删除？','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(() =>{
          let data = new URLSearchParams()
          data.append('ids',row.id)
          deleteProductAttr(data).then(response =>{
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
      filterSelectType(val){
        if (val === 2) return '多选'
        else if (val === 1) return '单选'
        else return '唯一'
      },
      filterInputType(val){
        if (val === 1) return '列表选取'
        else return '手工录入'
      }
    }
  }
</script>
