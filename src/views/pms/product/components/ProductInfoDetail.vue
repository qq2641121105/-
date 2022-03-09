<template>
  <el-form style="width: 300px" label-width="120px" size="small" :model="value" :rules="rules" ref="productInfoForm">
    <el-form-item label="商品分类：" prop="productCategoryId">
      <el-cascader v-model="selectProductCateValue" :options="productCateOptions"></el-cascader>
    </el-form-item>
    <el-form-item label="商品名称：" prop="name">
      <el-input style="width: 406px" v-model="value.name"></el-input>
    </el-form-item>
    <el-form-item label="副标题：" prop="subTitle">
      <el-input style="width: 406px" v-model="value.subTitle"></el-input>
    </el-form-item>
    <el-form-item label="商品品牌：" prop="brandId">
      <el-select placeholder="商品品牌"  v-model="value.brandId" clearable>
        <el-option v-for="item in productBrandOptions"
                   :label="item.label"
                   :key="item.value"
                   :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="商品介绍：">
      <el-input type="textarea" style="width: 406px" v-model="value.description"></el-input>
    </el-form-item>
    <el-form-item label="商品货号：">
      <el-input style="width: 406px" v-model="value.productSn"></el-input>
    </el-form-item>
    <el-form-item label="商品售价：">
      <el-input style="width: 406px" v-model="value.price"></el-input>
    </el-form-item>
    <el-form-item label="市场价：">
      <el-input style="width: 406px" v-model="value.originalPrice"></el-input>
    </el-form-item>
    <el-form-item label="商品库存：">
      <el-input style="width: 406px" v-model="value.stock"></el-input>
    </el-form-item>
    <el-form-item label="计量单位：">
      <el-input style="width: 406px" v-model="value.unit"></el-input>
    </el-form-item>
    <el-form-item label="商品重量：">
      <el-input style="width: 160px" v-model="value.weight"></el-input>
      <span> 克</span>
    </el-form-item>
    <el-form-item label="排序：">
      <el-input style="width: 406px" v-model="value.sort"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="margin-left: 200px" @click="handleNext('productInfoForm')">下一步，填写商品促销</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import {fetchListWithChiledren} from '../../../../api/productCate'
  import { fetchBrandList } from '../../../../api/brand'
  export default {
    data(){
      return{
        productCateOptions:[],
        selectProductCateValue:[],
        productBrandOptions:[],
        rules: {
          name: [
            {required: true, message: '请输入商品名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          subTitle: [{required: true, message: '请输入商品副标题', trigger: 'blur'}],
          productCategoryId: [{required: true, message: '请选择商品分类', trigger: 'blur'}],
          brandId: [{required: true, message: '请选择商品品牌', trigger: 'blur'}],
          description: [{required: true, message: '请输入商品介绍', trigger: 'blur'}],
          requiredProp: [{required: true, message: '该项为必填项', trigger: 'blur'}]
        }
      }
    },
    props:{
      value:Object
    },
    watch:{
      selectProductCateValue: function (newValue) {
        if (newValue != null && newValue.length === 2) {
          this.value.productCategoryId = newValue[1];
          this.value.productCategoryName= this.getCateNameById(this.value.productCategoryId);
        } else {
          this.value.productCategoryId = null;
          this.value.productCategoryName=null;
        }
      }
    },
    created (){
      this.getProductCateList()
      this.getProductBrandList();
    },
    methods:{
      getProductCateList(){
        fetchListWithChiledren().then(response =>{
          let cateList = response.data
          this.productCateOptions = []
          for (let i = 0;i < cateList.length;i++){
            let children = [];
            if (cateList[i].children != null || cateList[i].children.length>0){
              for (let j =0;j<cateList[i].children.length;j++){
                children.push({label: cateList[i].children[j].name, value: cateList[i].children[j].id});
              }
            }
            this.productCateOptions.push({label: cateList[i].name, value: cateList[i].id, children: children});
          }
          // console.log(this.productCateOptions)
        })
      },
      getProductBrandList(){
        fetchBrandList({pageNum: 1, pageSize: 100}).then(response =>{
          let brandList = response.data.list
          this.productBrandOptions = []
          for (let i = 0;i < brandList.length;i++){
            this.productBrandOptions.push({label:brandList[i].name,value:brandList[i].id})
          }
        })
      },
      getCateNameById(id){
        let name=null;
        for(let i=0;i<this.productCateOptions.length;i++){
          for(let j=0;j<this.productCateOptions[i].children.length;j++){
            if(this.productCateOptions[i].children[j].value===id){
              name=this.productCateOptions[i].children[j].label;
              return name;
            }
          }
        }
        return name;
      },
      handleNext(formName){
        this.$refs[formName].validate(valid => {
          if (valid){
            // console.log('handleNext')
            this.$emit('nextStep')
          }else{
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        })
      }
    }
  }
</script>
