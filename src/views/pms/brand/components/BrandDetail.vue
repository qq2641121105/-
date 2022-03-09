<template>
  <div>
    <el-card style="width: 50%">
      <el-form :model="productBrand">
        <el-form-item label="品牌名称：" label-width="100px">
          <el-input v-model="productBrand.name"></el-input>
        </el-form-item>
        <el-form-item label="品牌首字母：" label-width="100px">
          <el-input v-model="productBrand.firstLetter"></el-input>
        </el-form-item>
        <el-form-item label="品牌故事：" label-width="100px">
          <el-input type="textarea" v-model="productBrand.brandStory"></el-input>
        </el-form-item>
        <el-form-item label="排序：" label-width="100px">
          <el-input v-model="productBrand.sort"></el-input>
        </el-form-item>
        <el-form-item label="是否显示：" label-width="100px">
          <el-radio-group style="float: left;padding-top: 12px" v-model="productBrand.showStatus">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="品牌制造商：" label-width="100px">
          <el-radio-group style="float: left;padding-top: 12px" v-model="productBrand.factoryStatus">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleResForm">重置</el-button>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
  import {creatBrand,getBrand,updateBrand} from '@/api/brand'
  const defaultBrand = {
    bigPic: '',
    brandStory: '',
    factoryStatus: 0,
    firstLetter: '',
    logo: 'n',
    name: '',
    showStatus: 0,
    sort: 0
  }
  export default {
    data(){
      return{
        productBrand:Object.assign({},defaultBrand)
      }
    },
    props:{
      isEdit:{
        type:Boolean,
        default:false
      }
    },
    created () {
      if (this.isEdit){
        getBrand(this.$route.query.id).then(response =>{
          this.productBrand = response.data
        })
      }
    },
    methods:{
      handleResForm(){
        this.productBrand = defaultBrand
      },
      handleSubmit(){
        if (this.isEdit){
          updateBrand(this.$route.query.id,this.productBrand).then(responso =>{
            this.$message({
              message:'提交成功',
              type:'success',
              duration:1000
            })
            this.$router.push({path:'/pms/brand'})
          })
        }else{
          creatBrand(this.productBrand).then(response =>{
            this.$message({
              message:'提交成功',
              type:'success',
              duration:1000
            })
            this.$router.push({path:'/pms/brand'})
          })
        }
      }
    }
  }
</script>
<style scoped="scoped">
  .el-input{
    width: 70%;
    float: left;
  }
  .el-form-item{
    margin-left: 40px;
  }
</style>
