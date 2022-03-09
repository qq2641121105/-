<template>
  <div>
    <el-card style="width: 750px" shadow="never" >
      <el-form :model="productAttr">
        <el-form-item label="属性名称：" label-width="100px">
          <el-input v-model="productAttr.name" style="width: 500px;float: left"></el-input>
        </el-form-item>
        <el-form-item label="商品类型：" label-width="100px">
          <el-select v-model="productAttr.productAttributeCategoryId" style="float: left" placeholder="请选择">
            <el-option v-for="item in productAttrList" :key="item.id"
                       :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类筛选样式：" label-width="170px">
          <el-radio-group v-model="productAttr.filterType" style="float: left;margin-top: 10px">
            <el-radio :label="0">普通</el-radio>
            <el-radio :label="1">颜色</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="能否进行检索：" label-width="170px">
          <el-radio-group v-model="productAttr.searchType" style="float: left;margin-top: 10px">
            <el-radio :label="0">不需要检索</el-radio>
            <el-radio :label="1">关键字检索</el-radio>
            <el-radio :label="2">范围检索</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品属性关联：" label-width="170px">
          <el-radio-group v-model="productAttr.relatedStatus" style="float: left;margin-top: 10px">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="属性是否可选：" label-width="170px">
          <el-radio-group v-model="productAttr.selectType" style="float: left;margin-top: 10px">
            <el-radio :label="0">唯一</el-radio>
            <el-radio :label="1">单选</el-radio>
            <el-radio :label="2">复选</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="属性的录入方式：：" label-width="170px">
          <el-radio-group v-model="productAttr.inputType" style="float: left;margin-top: 10px">
            <el-radio :label="0">手工录入</el-radio>
            <el-radio :label="1">列表选择</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="属性值可选值列表：" label-width="140px">
          <el-input style="width: 500px;float: left" type="textarea"
                    :autosize="true" v-model="inputListFormat"></el-input>
        </el-form-item>
        <el-form-item label="是否手动新增：：" label-width="170px">
          <el-radio-group v-model="productAttr.handAddStatus" style="float: left;margin-top: 10px">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序属性：" label-width="100px">
          <el-input v-model="productAttr.sort" style="width: 500px;float: left"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="reSetForm">重置</el-button>
          <el-button @click="submitForm" type="primary">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
  import {fetchList,addAttrCate} from '@/api/productAttrCate'
  import {creatProductAttr,selectProductAttr,updateProductAttr} from '@/api/productAttr'
  const defaultProductAttr = {
    filterType: 0,
    handAddStatus: 0,
    inputList: '',
    inputType: 0,
    name: '',
    productAttributeCategoryId: 0,
    relatedStatus: 0,
    searchType: 0,
    selectType: 0,
    sort: 0,
    type: 0
  }
  export default {
    data(){
      return{
        productAttr:Object.assign({},defaultProductAttr),
        inputListFormat:null,
        productAttrList:[]
      }
    },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    created () {
      if (this.isEdit){
        selectProductAttr(this.$route.query.id).then(response =>{
          this.productAttr = response.data
          this.inputListFormat = this.productAttr.inputList.replace(/,/g,'\n');
        })
      }
      else {
        this.reSetForm()
      }
      this. getList()
    },
    methods:{
      getList(){
        fetchList({pageNum:1,pageSize:100}).then(response =>{
          this.productAttrList = response.data.list
          // console.log(this.productAttrList)
        })
      },
      reSetForm(){
        this.productAttr = defaultProductAttr
        this.inputListFormat = null
      },
      submitForm(){
          this.productAttr.type = this.$route.query.type
          if (this.isEdit){
            updateProductAttr(this.$route.query.id,this.productAttr).then(response=>{
              this.$message({
                message: '修改成功',
                type: 'success',
                duration: 1000
              });
              this.$router.back();
            });
          }
          else {
            creatProductAttr(this.productAttr).then(response =>{
              this.$message({
                message:'添加成功',
                type:'success',
                duration:1000
              })
            })
            this.$router.back();
          }
      }
    },
    watch:{
      inputListFormat: function (newValue, oldValue) {
        newValue = newValue.replace(/\n/g,',');
        this.productAttr.inputList = newValue;
      }
    },
  }
</script>
