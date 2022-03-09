<template>
  <div align="center" style="width: 100%">
    <div style="width: 50%">
  <el-steps :space="200" :active="orderInfo.status | filterOderStatusSteps" finish-status="success" align-center>
    <el-step title="提交订单"></el-step>
    <el-step title="支付订单"></el-step>
    <el-step title="平台发货"></el-step>
    <el-step title="确认收获"></el-step>
    <el-step title="完成评价"></el-step>
  </el-steps>
    </div>
  <el-card shadow="never" body-style="padding:0">
<!--    当前订单状态-->
    <div style="background: #F2F6FC;padding: 20px 0">
    <div style="float: left">
      <span style="color: red;margin-left: 10px">当前订单状态：{{orderInfo.status | filterCurrentOderStatus}}</span>
    </div>
    <div align="right" style="margin-right: 10px" v-show="orderInfo.status === 0">
      <el-button size="mini">修改收获人信息</el-button>
      <el-button size="mini" v-show="orderInfo.status === 0">修改商品信息</el-button>
      <el-button size="mini" v-show="orderInfo.status === 0">修改费用信息</el-button>
      <el-button size="mini" v-show="orderInfo.status === 0">发送站内信</el-button>
      <el-button size="mini" v-show="orderInfo.status === 0">关闭订单</el-button>
      <el-button size="mini" v-show="orderInfo.status === 0">备注订单</el-button>
    </div>
      <div align="right" style="margin-right: 10px" v-show="orderInfo.status === 1">
        <el-button size="mini">修改收获人信息</el-button>
        <el-button size="mini">发送站内信</el-button>
        <el-button size="mini">取消订单</el-button>
        <el-button size="mini">备注订单</el-button>
      </div>
      <div align="right" style="margin-right: 10px" v-show="orderInfo.status === 2">
        <el-button size="mini">订单跟踪</el-button>
        <el-button size="mini">发送站内信</el-button>
        <el-button size="mini">备注订单</el-button>
      </div>
      <div align="right" style="margin-right: 10px" v-show="orderInfo.status === 3">
        <el-button size="mini">订单跟踪</el-button>
        <el-button size="mini">发送站内信</el-button>
        <el-button size="mini">备注订单</el-button>
      </div>
      <div align="right" style="margin-right: 10px" v-show="orderInfo.status === 4">
        <el-button size="mini">删除订单</el-button>
        <el-button size="mini">备注订单</el-button>
      </div>
    </div>
<!--    基本信息-->
    <div style="padding: 10px">
      <div style="margin: 20px;width: 100%">
        <span style="float:left">基本信息</span>
      </div>
    <div  class="table-layout">
      <el-row>
        <el-col :span="4" class="table-cell-title">订单编号</el-col>
        <el-col :span="4" class="table-cell-title">发货单流水号</el-col>
        <el-col :span="4" class="table-cell-title">用户账号</el-col>
        <el-col :span="4" class="table-cell-title">支付方式</el-col>
        <el-col :span="4" class="table-cell-title">订单来源</el-col>
        <el-col :span="4" class="table-cell-title">订单类型</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="table-cell ">{{orderInfo.orderSn}}</el-col>
        <el-col :span="4" class="table-cell ">暂无</el-col>
        <el-col :span="4" class="table-cell ">{{orderInfo.memberUsername}}</el-col>
        <el-col :span="4" class="table-cell ">{{orderInfo.payType | filterPayType}}</el-col>
        <el-col :span="4" class="table-cell ">{{orderInfo.sourceType | filterSourceType}}</el-col>
        <el-col :span="4" class="table-cell ">{{orderInfo.orderType | filterOrderType}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="table-cell-title">配送方式</el-col>
        <el-col :span="4" class="table-cell-title">物流单号</el-col>
        <el-col :span="4" class="table-cell-title">自动确认收获时间</el-col>
        <el-col :span="4" class="table-cell-title">订单可得优币</el-col>
        <el-col :span="4" class="table-cell-title">订单可得成长值</el-col>
        <el-col :span="4" class="table-cell-title">活动信息</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="table-cell ">暂无</el-col>
        <el-col :span="4" class="table-cell ">暂无</el-col>
        <el-col :span="4" class="table-cell ">{{orderInfo.autoConfirmDay}}天</el-col>
        <el-col :span="4" class="table-cell ">{{orderInfo.integration}}</el-col>
        <el-col :span="4" class="table-cell ">{{orderInfo.growth}}</el-col>
        <el-col :span="4" class="table-cell ">
          <el-popover
            placement="top-start"
            title="活动信息"
            width="200"
            trigger="hover"
            :content="orderInfo.promotionInfo">
            <span slot="reference">{{orderInfo.promotionInfo | filterLongText}}</span>
          </el-popover>
        </el-col>
      </el-row>
    </div>
    </div>
<!--    收获人信息-->
  </el-card>
  </div>
</template>
<script>
  import {orderInfo} from '@/api/order'
  export default {
    data(){
      return{
        orderId:null,
        orderInfo:null
      }
    },
    created () {
      this.orderId = this.$route.query.id
      this.getList()
    },
    methods: {
      getList () {
        orderInfo(this.orderId).then(response => {
          this.orderInfo = response.data
          console.log(this.orderInfo)
        })
      },
    },
    filters:{
      filterOderStatusSteps(value){
        if (value === 1) {
          //待发货
          return 2;
        } else if (value === 2) {
          //已发货
          return 3;
        } else if (value === 3) {
          //已完成
          return 4;
        }else {
          //待付款、已关闭、无限订单
          return 1;
        }
      },
      filterCurrentOderStatus(value){
        if (value === 0) return '待付款'
       else if (value === 1) return '待发货';
         else if (value === 2) return '已发货';
         else if (value === 3) return '已完成';
        else if (value === 4) return '已关闭'
        else if (value === 5) return '无效订单'
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
      filterOrderType(value){
          if (value === 0) return '正常订单'
        else if (value === 1)return '秒杀订单'
      },
      filterLongText(value){
        if(value===undefined||value===null||value===''){
          return '暂无';
        }else if(value.length>8){
          return value.substr(0, 8) + '...';
        }else{
          return value;
        }
      }
    }
  }
</script>
<style scoped="scoped">
.el-card{
  width: 90%;
  margin-top: 20px;
}
  .table-layout{
    margin-top: 60px;
    border-left: 1px solid #DCDFE6;
    border-top: 1px solid #DCDFE6;
  }
  .table-cell-title {
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    background: #F2F6FC;
    text-align: center;
    font-size: 14px;
    color: #303133;
  }
.table-cell {
  border-right: 1px solid #DCDFE6;
  border-bottom: 1px solid #DCDFE6;
  padding: 20px;
  text-align: center;
  font-size: 14px;
  color: #303133;
}
</style>
