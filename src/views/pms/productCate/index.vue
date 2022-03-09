<template>
  <div class="productCate">
    <el-card shadow="never">
      <div class="top" style="float: left">
      <el-icon class="el-icon-s-order"></el-icon>
      <span style="margin-left: 5px">数据列表</span>
      </div>
      <el-button size="small" style="float: right;margin-bottom: 13px"
                  @click="handleAddProductCate">添加</el-button>
    </el-card>
    <el-table border :data="list" style="width: 100%">
        <el-table-column label="编号" align="center" width="50">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
      <el-table-column label="分类名称" align="center">
        <template slot-scope="scope">{{scope.row.name}}</template>
      </el-table-column>
      <el-table-column label="分类级别" align="center">
        <template slot-scope="scope">{{scope.row.level | levelFilter}}</template>
      </el-table-column>
      <el-table-column label="商品数量" align="center">
        <template slot-scope="scope">{{scope.row.productCount}}</template>
      </el-table-column>
      <el-table-column label="数量单位" align="center">
        <template slot-scope="scope">{{scope.row.productUnit}}</template>
      </el-table-column>
      <el-table-column label="导航栏" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.navStatus"
                    :active-value="1"
                    :inactive-value="0"
                    @change="handleUpdateNvaStatus(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="是否显示" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.showStatus"
                     :active-value="1"
                     :inactive-value="0"
                     @change="handleUpdateShowStatus(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center">
        <template slot-scope="scope">{{scope.row.sort}}</template>
      </el-table-column>
      <el-table-column label="设置" align="center" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleShowNexLevel(scope.row)" :disabled="scope.row.level | disableNextLevel">查看下级</el-button>
          <el-button size="mini" @click="handleTransProduct">转移商品</el-button>
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
  </div>
</template>
<script>
  import { fetchList ,updataNavStatus,updataShowStatus,fetchListWithChiledren,deleteProductCate} from '../../../api/productCate'
  export default {
    data(){
      return{
        list:[],
        parentId:0,
        listQuery:{
          pageNum:1,
          pageSize:5
        },
        total:null
      }
    },
    created () {
      this.resetParentId()
      this.getList()
    },
    watch:{
        $route(route){
            this.resetParentId()
            this.getList()
        }
    },
    methods:{
      getList(){
        this.list = []
        fetchList(this.parentId,this.listQuery).then(response =>{
          this.list = response.data.list
          this.total = response.data.total
        })
      },
      resetParentId(){
        this.listQuery.pageNum = 1;
        if (this.$route.query.parentId != null) this.parentId = this.$route.query.parentId
        else this.parentId = 0
      },
      handleAddProductCate()  {
        this.$router.push({path:'/pms/addProductCate'})
      },
      handleUpdateNvaStatus(row){
        let data= new URLSearchParams()
        let ids = []
        ids.push(row.id)
        data.append('ids',ids)
        data.append('navStatus',row.navStatus)
        updataNavStatus(data).then(response =>{
          this.$message({
            message:'修改成功',
            type:'success',
            duration:'1000'
          })
        })
      },
      handleUpdateShowStatus(row){
        let data= new URLSearchParams()
        let ids = []
        ids.push(row.id)
        data.append('ids',ids)
        data.append('showStatus',row.showStatus)
        updataShowStatus(data).then(response =>{
          this.$message({
            message:'修改成功',
            type:'success',
            duration:'1000'
          })
        })
      },
      handleShowNexLevel(row){
        this.$router.push({path:'/pms/productCate',query:{parentId:row.id}})
      },
      handleTransProduct(){
        this.$message({
          message:'暂未实现',
          type:'warning',
          duration:'1000'
        })
      },
      handleUpdate(row){
        // this.$router.push({ path: '/pms/updateProductCate',query:{id:row.id}})
        this.$message({
          message:'暂未实现',
          type:'warning',
          duration:1000
        })
      },
      handleDelete(row){
        this.$confirm('是否确认删除','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(() =>{
          deleteProductCate(row.id).then(response =>{
            this.$message({
              message:'删除成功',
              type:'success',
              duration:1000
            })
            this.getList()
          })
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
      levelFilter(value){
        if (value === 0) return '一级'
        else if (value === 1) return '二级'
      },
      disableNextLevel(value){
        if (value === 0) return false
        else if (value === 1) return true
      }
    }
  }
</script>
