<template>
  <div class="app-container">
    <el-card shadow="never" class="card-top">
      <div>
        <div style="float:left;">
          <i class="el-icon-search search"/>
          <span class="search">筛选搜索</span>
        </div>
        <el-button class="search-button" @click="handleSearchList()" type="primary" style=" margin-left: 15px;float: right" size="small">查询结果</el-button>
        <el-button class="reset-button" style="float: right" size="small" @click="handleResetSearch()">重置</el-button>
      </div>
      <div style="margin-top: 40px;">
        <el-form :inline="true" size="small" :model="listQuery">
          <el-form-item label="订单编号：" style="margin-left: 100px">
            <el-input placeholder="订单编号：" v-model="listQuery.orderSn"></el-input>
          </el-form-item>
          <el-form-item label="收货人：">
            <el-input placeholder="收货人" v-model="listQuery.receiverKeyword"></el-input>
          </el-form-item>
          <el-form-item label="提交时间：">
            <el-date-picker type="date" placeholder="选择日期" class="input-width"
                            v-model="listQuery.createTime"></el-date-picker>
          </el-form-item>
          <el-form-item label="订单状态：" style="margin-left: 100px">
            <el-select placeholder="订单状态"   v-model="listQuery.status" clearable>
              <el-option v-for="item in statusList" :key="item.value" :label="item.name"
                          :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单分类：">
            <el-select placeholder="全部"  v-model="listQuery.orderType" clearable>
              <el-option v-for="item in orderCate" :key="item.value"
                          :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单来源：">
            <el-select placeholder="全部" v-model="listQuery.sourceType" clearable>
              <el-option v-for="item in orderSource" :key="item.value"
                         :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card shadow="never" class="operate-container" style="margin-top: 20px">
      <i class="el-icon-tickets" style="padding: 5px;float: left"></i>
      <span style="float: left">数据列表</span>
    </el-card>
    <el-table border :data="list" style="margin-top: 20px">
      <el-table-column type="selection" width="60" align="center"></el-table-column>
      <el-table-column prop="id" label="编号" width="=180" align="center"></el-table-column>
      <el-table-column label="订单编号" width="180" align="center" prop="orderSn"></el-table-column>
      <el-table-column  label="提交时间" width="=180" align="center">
        <template slot-scope="scope">{{scope.row.createTime | filterTime}}</template>
      </el-table-column>
      <el-table-column label="用户账号" width="=180" align="center" prop="memberUsername"></el-table-column>
      <el-table-column  label="订单金额" width="=180" align="center" prop="totalAmount"></el-table-column>
      <el-table-column label="支付方式" width="100" align="center">
        <template slot-scope="scope">{{scope.row.payType | filterPayType}}</template>
      </el-table-column>
      <el-table-column prop="sale" label="订单来源" width="=180" align="center">
          <template slot-scope="scope">{{scope.row.sourceType | filterSourceType}}</template>
      </el-table-column>
      <el-table-column label="订单状态" width="100" align="center">
        <template slot-scope="scope">{{scope.row.status | filterStatus}}</template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleViewOrder(scope.row)">查看订单</el-button>
          <el-button size="mini" v-show="scope.row.status === 4" type="danger">删除订单</el-button>
          <el-button size="mini" v-show="scope.row.status === 1">订单发货</el-button>
          <el-button size="mini" v-show="scope.row.status === 0">关闭订单</el-button>
          <el-button size="mini" v-show="scope.row.status === 2 || scope.row.status === 3">订单跟踪</el-button>
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
        :page-sizes="[10,15,30]"
        :current-page.sync="listQuery.pageNum"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {orderList} from '@/api/order'
  import  {formatDate} from '@/utils/date'
  const defaultListQuery = {
    createTime:null,
    orderSn:null,
    orderType:null,
    pageNum:1,
    pageSize:10,
    receiverKeyword:null,
    sourceType:null,
    status:null
  }
  export default {
    data(){
      return{
          listQuery:Object.assign({},defaultListQuery),
        list:[],
        total:null,
        statusList:[
          {
            name:'待付款',
            value:0
          },
          {
            name:'待发货',
            value:1
          },
          {
            name:'已发货',
            value:2
          },
          {
            name:'已完成',
            value:3
          },
          {
            name:'已关闭',
            value:4
          },
        ],
        orderCate:[
          {
            name:'正常订单',
            value:0
          },
          {
            name:'秒杀订单',
            value:1
          }
        ],
        orderSource:[
          {
            name:'PC订单',
            value:0
          },
          {
            name:'app订单',
            value:1
          }
        ]
      }
    },
    created () {
        this.getList()
    },
    methods:{
        getList(){
          orderList(this.listQuery).then(response =>{
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
      handleViewOrder(row){
          this.$router.push({path:'/oms/orderDetail',query:{id:row.id}})
      }
    },
    filters:{
      filterTime(time){
        if(time == null || time ==='') return 'N/A'
        let data = new Date(time)
        return formatDate(data,'yyyy-MM-dd hh:mm:ss')
      },
      filterPayType(value){
        if (value === 1) {
          return '支付宝';
        } else if (value === 2) {
          return '微信';
        } else {
          return '未支付';
        }
      },
      filterSourceType(value){
        if (value === 0) return 'PC订单'
        else if (value === 1) return 'app订单'
      },
      filterStatus(value){
        switch (value) {
          case 0: return '待付款'
          case 1: return '待发货'
          case 2: return '已发货'
          case 3: return '以完成'
          case 4: return '已关闭'
          case 5: return '无效订单'
        }
      }
    }
  }
</script>
<style scoped="scoped">
  .el-input {
    width: 210px;
  }
  .el-form-item{
    float: left;
    margin-left: 20px;
  }
</style>
