<template>
  <div align="center">
    <el-card shadow="never" style="width: 50%;">
    <el-form>
      <el-form-item label-width="400" label="秒杀订单超时：">
        <el-input><template slot="append">分</template></el-input>
        <span>未付款，订单自动关闭</span>
      </el-form-item>
      <el-form-item label-width="400" label="正常订单超过：">
        <el-input><template slot="append">分</template></el-input>
        <span>未付款，订单自动关闭</span>
      </el-form-item>
      <el-form-item label-width="400" label="发货超过：" style="margin-left: 28px">
        <el-input><template slot="append">天</template></el-input>
        <span>未收货，订单自动完成</span>
      </el-form-item>
      <el-form-item label-width="400" label="订单完成超过：">
        <el-input><template slot="append">天</template></el-input>
        <span>自动介绍交易,不能申请售后</span>
      </el-form-item>
      <el-form-item label-width="400" label="订单完成超过：">
        <el-input><template slot="append">天</template></el-input>
        <span>自动五星好评</span>
      </el-form-item>
      <el-form-item label-width="400">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
    </el-card>
  </div>
</template>
<script>
  export default {
    methods:{
      handleSubmit(){
        this.$message({
          message:'暂未实现',
          type:'warning',
          duration:1000
        })
      }
    }
  }
</script>
<style slot-scope="scope">
  .el-input{
    width: 400px;
    float: left;
  }

</style>
