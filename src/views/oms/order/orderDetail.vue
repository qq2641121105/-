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
    <div style="padding: 10px">
      <div style="margin: 20px;width: 100%">
        <span style="float:left">收获人信息</span>
      </div>
      <div  class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">收货人</el-col>
          <el-col :span="6" class="table-cell-title">手机号码</el-col>
          <el-col :span="6" class="table-cell-title">邮政编码</el-col>
          <el-col :span="6" class="table-cell-title">收货地址</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell ">{{orderInfo.receiverName}}</el-col>
          <el-col :span="6" class="table-cell ">{{orderInfo.receiverPhone}}</el-col>
          <el-col :span="6" class="table-cell ">{{orderInfo.receiverPostCode}}</el-col>
          <el-col :span="6" class="table-cell ">{{orderInfo | filterAddress}}</el-col>
        </el-row>
      </div>
    </div>
<!--    商品信息-->
    <div style="padding: 10px">
      <div style="margin: 20px;width: 100%">
        <span style="float:left">商品信息</span>
      </div>
      <el-table
        ref="orderItemTable"
        :data="orderInfo.orderItemList"
        style="width: 100%;margin-top: 20px" border>
        <el-table-column label="商品图片" width="120" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.productPic" style="height: 80px">
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.productName}}</p>
            <p>品牌：{{scope.row.productBrand}}</p>
          </template>
        </el-table-column>
        <el-table-column label="价格/货号" width="120" align="center">
          <template slot-scope="scope">
            <p>价格：￥{{scope.row.productPrice}}</p>
            <p>货号：{{scope.row.productSn}}</p>
          </template>
        </el-table-column>
        <el-table-column label="属性" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.productAttr | filterProductAttr}}
          </template>
        </el-table-column>
        <el-table-column label="数量" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.productQuantity}}
          </template>
        </el-table-column>
        <el-table-column label="小计" width="120" align="center">
          <template slot-scope="scope">
            ￥{{scope.row.productPrice*scope.row.productQuantity}}
          </template>
        </el-table-column>
      </el-table>
      <div style="float:right;;">
      合计:￥<span style="color: red">{{orderInfo.totalAmount}}</span>
      </div>
    </div>
<!--    费用信息-->
    <div style="padding: 10px">
      <div style="margin: 20px;width: 100%">
        <span style="float:left">费用信息</span>
      </div>
      <div  class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">商品合计</el-col>
          <el-col :span="6" class="table-cell-title">运费</el-col>
          <el-col :span="6" class="table-cell-title">优惠券</el-col>
          <el-col :span="6" class="table-cell-title">积分抵扣</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell ">￥{{orderInfo.totalAmount}}</el-col>
          <el-col :span="6" class="table-cell ">￥{{orderInfo.freightAmount}}</el-col>
          <el-col :span="6" class="table-cell ">￥{{orderInfo.couponAmount}}</el-col>
          <el-col :span="6" class="table-cell ">￥{{orderInfo.integrationAmount}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">活动优惠</el-col>
          <el-col :span="6" class="table-cell-title">折扣金额</el-col>
          <el-col :span="6" class="table-cell-title">订单总金额</el-col>
          <el-col :span="6" class="table-cell-title">应付款金额</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell ">￥{{orderInfo.promotionAmount}}</el-col>
          <el-col :span="6" class="table-cell ">￥{{orderInfo.discountAmount}}</el-col>
          <el-col :span="6" class="table-cell ">￥{{orderInfo.totalAmount+orderInfo.freightAmount}}</el-col>
          <el-col :span="6" class="table-cell ">￥{{orderInfo.payAmount+orderInfo.freightAmount-orderInfo.discountAmount}}</el-col>
        </el-row>
      </div>
    </div>
<!--    操作信息-->
    <div style="padding: 10px">
      <div style="margin: 20px;width: 100%">
        <span style="float:left">操作信息</span>
      </div>
      <el-table
        ref="orderItemTable"
        :data="orderInfo.historyList"
        style="width: 100%;margin-top: 70px" border>
        <el-table-column label="操作者" width="120" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.operateMan" style="height: 80px">
          </template>
        </el-table-column>
        <el-table-column label="操作时间" align="center" width="120">
          <template slot-scope="scope">
            <p>{{scope.row.createTime}}</p>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" width="120" align="center">
          <template slot-scope="scope">
            <p>价格：￥{{scope.row.orderStatus | filterStatus}}</p>
          </template>
        </el-table-column>
        <el-table-column label="付款状态" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.orderStatus | filterPayType}}
          </template>
        </el-table-column>
        <el-table-column label="发货状态" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.orderStatus | filterDeliverStatus}}
          </template>
        </el-table-column>
        <el-table-column label="备注"  align="center">
          <template slot-scope="scope">
            ￥{{scope.row.note}}
          </template>
        </el-table-column>
      </el-table>
    </div>
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
      },
      filterAddress(order) {
        let str = order.receiverProvince;
        if (order.receiverCity != null) {
          str += "  " + order.receiverCity;
        }
        str += "  " + order.receiverRegion;
        str += "  " + order.receiverDetailAddress;
        return str;
      },
      filterProductAttr(value){
        if(value==null){
          return '';
        }else{
          let attr = JSON.parse(value);
          let result='';
          for(let i=0;i<attr.length;i++){
            result+=attr[i].key;
            result+=":";
            result+=attr[i].value;
            result+=";";
          }
          return result;
        }
      },
      filterStatus(value) {
        if (value === 1) {
          return '待发货';
        } else if (value === 2) {
          return '已发货';
        } else if (value === 3) {
          return '已完成';
        } else if (value === 4) {
          return '已关闭';
        } else if (value === 5) {
          return '无效订单';
        } else {
          return '待付款';
        }
      },
      filterDeliverStatus(value) {
        if (value === 0||value === 1) {
          return '未发货';
        } else {
          return '已发货';
        }
      },
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
