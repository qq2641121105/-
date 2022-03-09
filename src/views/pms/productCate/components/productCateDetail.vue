<template>
  <div>
    <el-card style="width: 750px" shadow="never" >
      <el-form :model="productCate">
        <el-form-item label="分类名称：" label-width="100px">
          <el-input v-model="productCate.name" style="width: 500px;float: left"></el-input>
        </el-form-item>
        <el-form-item label="上级分类：" label-width="100px">
          <el-select v-model="productCate.parentId" style="float: left">
            <el-option v-for="item in productCateList" :key="item.value"
                      :label="item.label"
                      :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量单位：" label-width="100px">
          <el-input v-model="productCate.productUnit" style="width: 500px;float: left"></el-input>
        </el-form-item>
        <el-form-item label="排序：" label-width="100px">
          <el-input v-model="productCate.sort" style="width: 500px;float: left"></el-input>
        </el-form-item>
        <el-form-item label="是否显示：" label-width="100px">
          <el-radio-group v-model="productCate.showStatus" style="float: left;margin-top: 10px">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否显示在导航栏上：" label-width="170px">
          <el-radio-group v-model="productCate.navStatus" style="float: left;margin-top: 10px">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-for="(filterProductAttr,index) in filterProductAttrList"
                      :label="index | filterLabelFilter"
                      :key="filterProductAttr.key" style="margin-left: 15px">
          <el-cascader
            v-model="filterProductAttr.value"
            :options="filterAttrs" style="float:left;"></el-cascader>
          <el-button @click.prevent="handleDeleteFilterAttr(filterProductAttr)" style="float:left;margin-left: 10px" >删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left: 70px;float: left"
                    @click="handleAddFilterAttr()">新增</el-button>
        </el-form-item>
        <el-form-item label="关键词：" label-width="100px">
          <el-input v-model="productCate.keywords" style="width: 500px;float: left"></el-input>
        </el-form-item>
        <el-form-item label="分类描述：" label-width="100px">
          <el-input style="width: 500px;float: left" type="textarea"
                    :autosize="true" v-model="productCate.description"></el-input>
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
  import {fetchList,creaProductCate} from '@/api/productCate'
  import {fetchListWithAttr} from  '@/api/productAttrCate'
  const defaultProductCate={
        name:'',
        parentId:0,
        productUnit:'',
        sort:0,
        navStatus:0,
        showStatus:0,
        keywords:'',
        description:'',
        icon:'',
        productAttributeIdList:[]
    }
  export default {
    props:{
      isEdit:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return{
        productCate:Object.assign({},defaultProductCate),
        productCateList:[],
        filterProductAttrList: [{
          value: []
        }],
        filterAttrs:[]
      }
    },
    created () {
      this.gteProductCate()
      this.getProductAttrCateList()
    },
    methods:{
      gteProductCate(){
        fetchList(0,{pageNum:1,pageSize:100}).then(response =>{
          let list = response.data.list
          for (let i = 0;i < list.length;i++){
            this.productCateList.push({label:list[i].name,value:list[i].id})
          }
          this.productCateList.unshift({label:'无上级分类',value:0})
        })
      },
      getProductAttrCateList(){
        fetchListWithAttr().then(response =>{
          // console.log(response.data)
          for (let i = 0;i<response.data.length;i++){
            let list = response.data[i]
            let children = []
            if (response.data[i].productAttributeList !=null && response.data[i].productAttributeList.length >0){
               for (let j = 0;j < response.data[i].productAttributeList.length;j++){
                 children.push({label:response.data[i].productAttributeList[j].name,value:response.data[i].productAttributeList[j].id})
               }
            }
            this.filterAttrs.push({label:list.name,value:list.id,children:children})
          }
          // console.log(this.filterAttrs)
        })
      },
      handleAddFilterAttr() {
        if (this.filterProductAttrList.length === 3) {
          this.$message({
            message: '最多添加三个',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        this.filterProductAttrList.push({
          value: null,
          key: Date.now()
        });
      },
      handleDeleteFilterAttr(productAttributeId){
        if (this.filterProductAttrList.length === 1) {
          this.$message({
            message: '至少要留一个',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        let index = this.filterProductAttrList.indexOf(productAttributeId);
        if (index !== -1) {
          this.filterProductAttrList.splice(index, 1)
        }
      },
      reSetForm(){
        this.productCate = defaultProductCate
        this.filterProductAttrList = [{
          value: []
        }];
      },
      submitForm(){
        this.productCate.productAttributeIdList = this.getProductAttributeIdList()
        creaProductCate(this.productCate).then(response =>{
          // console.log(response)
          this.$message({
            message:'提交成功',
            type:'success',
            duration:1000
          })
        })
      },
      getProductAttributeIdList() {
        //获取选中的筛选商品属性
        let productAttributeIdList = [];
        for (let i = 0; i < this.filterProductAttrList.length; i++) {
          let item = this.filterProductAttrList[i];
          if (item.value !== null && item.value.length === 2) {
            productAttributeIdList.push(item.value[1]);
          }
        }
        return productAttributeIdList;
      },
    },
    filters: {
      filterLabelFilter(index) {
        if (index === 0) {
          return '筛选属性：';
        } else {
          return '';
        }
      }
    }
  }
</script>
