<template>
  <div class="app-container">
    <el-card shadow="never" class="card-top">
      <div>
        <i class="el-icon-search search" style="float:left;"/>
        <span class="search" style="float:left;">筛选搜索</span>
        <el-button class="search-button" @click="handleSearchList()" type="primary" style=" margin-left: 15px;float: right" size="small">查询结果</el-button>
      </div>
      <div style="margin-top: 40px;float: left">
        <el-form :inline="true" size="small" label-width="100px">
          <el-form-item label="输入搜索：">
            <el-input placeholder="品牌名称" style="width: 203px" v-model="listQuery.keyword"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card shadow="never" class="operate-container;" style="margin-top: 20px">
      <i class="el-icon-tickets" style="padding: 5px;float: left"></i>
      <span style="float: left">数据列表</span>
      <el-button size="mini" style="float: right;margin-bottom: 12px" @click="handleAddProduct()">添加</el-button>
    </el-card>
    <el-table style="margin-top: 20px" border :data="list">
      <el-table-column type="selection" width="60" align="center"></el-table-column>
      <el-table-column prop="id" label="编号" width="=180" align="center">
        <template slot-scope="scpoe">{{scpoe.row.id}}</template>
      </el-table-column>
      <el-table-column prop="name" label="品牌名称" width="=180" align="center">
        <template slot-scope="scpoe">{{scpoe.row.name}}</template>
      </el-table-column>
      <el-table-column prop="sort" label="品牌字母" width="=180" align="center">
        <template slot-scope="scpoe">{{scpoe.row.firstLetter}}</template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="=180" align="center">
        <template slot-scope="scpoe">{{scpoe.row.sort}}</template>
      </el-table-column>
      <el-table-column prop="sale" label="品牌制造商" width="=180" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.factoryStatus"
                     :active-value="1"
                     :inactive-value="2"
                      @change="handleFactoryStatus(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="sale" label="是否显示" width="=180" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.showStatus"
                     :active-value="1"
                     :inactive-value="2"
                    @change="handleshowStatus(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="sale" label="相关" width="=180" align="center">
        <template slot-scope="scope">
          <p>商品:{{scope.row.productCount}} 评价:{{scope.row.productCommentCount}}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <p>
            <el-button
              size="mini"
            @click="handleEdit(scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              @click="handleDeleteBrand(scope.row)"
              type="danger">删除
            </el-button>
          </p>
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
  import {fetchBrandList,updateFactoryStatus,updateShowStatus
          ,deleteBrand} from  '@/api/brand'
  export  default {
    data(){
      return{
        listQuery:{
          keyword:'',
          pageNum:1,
          pageSize:10
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
        fetchBrandList(this.listQuery).then(response =>{
          this.list = response.data.list
          this.total = response.data.total
        })
      },
      handleFactoryStatus(row){
        let data = new URLSearchParams()
        let ids = []
        ids.push(row.id)
        data.append('factoryStatus',row.factoryStatus)
        data.append('ids',ids)
        updateFactoryStatus(data).then(response =>{
          this.$message({
            message:'修改成功',
            type:'success',
            duration:1000
          })
        })
      },
      handleshowStatus(row){
        let data = new URLSearchParams()
        let ids = []
        ids.push(row.id)
        data.append('showStatus',row.showStatus)
        data.append('ids',ids)
        updateShowStatus(data).then(response =>{
          this.$message({
            message:'修改成功',
            type:'success',
            duration:1000
          })
        })
      },
      handleSizeChange(val){
        this.listQuery.pageNum = 1
        this.listQuery.pageSize = val
        this.getList()
      },
      handleCurrentChange(val){
        this.listQuery.pageNum = val
        this.getList()
      },
      handleSearchList(){
        this.getList()
      },
      handleDeleteBrand(row){
        this.$confirm('确定要删除该品牌？','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消'
        }).then(() =>{
          deleteBrand(row.id).then(response =>{
            this.$message({
                message:"删除成功",
                type:'success',
                duration:1000
              })
            this.getList()
          })
        })
      },
      handleAddProduct(){
        this.$router.push({path:'/pms/addBrand'})
      },
      handleEdit(row){
        this.$router.push({path:'/pms/editBrand',query:{id:row.id}})
      }
    }
  }
</script>
