<template>
  <div>
    <el-card shadow="never" class="card-top">
      <div>
        <div style="float:left;">
        <i class="el-icon-search search"/>
        <span class="search">筛选搜索</span>
        </div>
        <el-button class="search-button" @click="handleSearchList()" type="primary" style=" margin-left: 15px;float: right" size="small">查询结果</el-button>
        <el-button class="reset-button" style="float: right" size="small" @click="handleResetSearch()">重置</el-button>
      </div>
      <div>
        <el-form :inline="true" size="small" label-width="200px" v-model="listQuery">
          <el-form-item label="输入搜索：">
            <el-input placeholder="服务单号：" style="width: 203px"></el-input>
          </el-form-item>
          <el-form-item label="处理状态：">
            <el-select v-model="listQuery.status">
              <el-option v-for="item in handleStatus" :key="item.value"
                        :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请时间：">
            <el-date-picker
              v-model="listQuery.createTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="操作人员：">
            <el-input placeholder="全部" style="width: 203px"></el-input>
          </el-form-item>
          <el-form-item label="处理时间：">
            <el-date-picker
              v-model="listQuery.handleTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card shadow="never" style="margin-top: 20px">
      <i class="el-icon-tickets" style="padding: 5px;float: left"></i>
      <span style="float: left;">数据列表</span>
    </el-card>
    <el-table border :data="list">
      <el-table-column type="selection" width="60" align="center"></el-table-column>
      <el-table-column prop="id" label="服务单号" width="=180" align="center"></el-table-column>
      <el-table-column label="申请时间" width="180" align="center">
        <template slot-scope="scope">{{scope.row.createTime | filterTime}}</template>
      </el-table-column>
      <el-table-column prop="memberUsername" label="用户账号" width="=180" align="center"></el-table-column>
      <el-table-column label="退款金额" width="=180" align="center">
        <template slot-scope="scope">￥{{scope.row | formatReturnAmount}}</template>
      </el-table-column>
      <el-table-column prop="sort" label="处理时间" width="=180" align="center">
        <template slot-scope="scope">{{scope.row.handleTime| filterTime}}</template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
            <el-button
              size="mini" @click="handleDetail(scope.row)">查看详情
            </el-button>
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
        :page-sizes="[10,15,20]"
        :current-page.sync="listQuery.pageNum"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {fetchList} from '@/api/applyReturn'
  import  {formatDate} from '@/utils/date'
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    id: null,
    receiverKeyword: null,
    status: null,
    createTime: null,
    handleMan: null,
    handleTime: null
  }
  export default {
    data(){
      return{
        listQuery: Object.assign({},defaultListQuery),
        handleStatus:[
          {
            label:'待处理',
            value:0
          },
          {
            label:'退货中',
            value:1
          },
          {
            label:'已完成',
            value:2
          },
          {
            label:'已拒绝',
            value:3
          }
        ],
        list:[],
        total:null
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
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleSearchList(){
          this.getList()
      },
      handleResetSearch(){
          this.listQuery = defaultListQuery
      },
      handleDetail(row){
        this.$router.push({ path: '/oms/returnReasonDetail',query:{id:row.id}})
      }
    },
    filters:{
      filterTime(time){
        if(time == null || time ==='') return 'N/A'
        let data = new Date(time)
        return formatDate(data,'yyyy-MM-dd hh:mm:ss')
      },
      formatReturnAmount(row){
        return row.productRealPrice*row.productCount;
      }
    }
  }
</script>
<style slot-scope="scope">
  .el-form{
    margin-top: 50px;
  }
  .el-form-item{
    float:left;
  }
</style>
