<template>
  <el-form :model="value" style="width: 300px" label-width="120px" size="small">
    <el-form-item style="width: 300px" label="属性类型：">
      <el-select placeholder="请选择属性类型" v-model="value.productAttributeCategoryId" @change="handleProductAttrChange">
        <el-option v-for="item in productAttributeCategoryOptions"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="商品规格：" style="width: 800px">
      <el-card shadow="never" class="cardBg">
        <div v-for="(productAttr,idx) in selectProductAttr" :key="productAttr.name">
          {{productAttr.name}}：
          <el-checkbox-group v-if="productAttr.handAddStatus===0" v-model="selectProductAttr[idx].values">
            <el-checkbox v-for="item in getInputListArr(productAttr.inputList)" :label="item" :key="item"
                         class="littleMarginLeft"></el-checkbox>
          </el-checkbox-group>
          <div v-else>
            <el-checkbox-group v-model="selectProductAttr[idx].values">
              <div v-for="(item,index) in selectProductAttr[idx].options" style="display: inline-block"
                   class="littleMarginLeft" :key="item">
                <el-checkbox :label="item" :key="item"></el-checkbox>
                <el-button type="text" class="littleMarginLeft" @click="handleRemoveProductAttrValue(idx,index)">删除
                </el-button>
              </div>
            </el-checkbox-group>
            <el-input v-model="addProductAttrValue" style="width: 160px;margin-left: 10px" clearable></el-input>
            <el-button class="littleMarginLeft" @click="handleAddProductAttrValue(idx)">增加</el-button>
          </div>
        </div>
      </el-card>
      <el-table style="width: 100%;margin-top: 20px"
                :data="value.skuStockList"
                border>
        <el-table-column
          v-for="(item,index) in selectProductAttr"
          :label="item.name"
          :key="item.id"
          align="center">
          <template slot-scope="scope">
            {{getProductSkuSp(scope.row,index)}}
          </template>
        </el-table-column>
        <el-table-column
          label="销售价格"
          width="80"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="商品库存"
          width="80"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.stock"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="库存预警值"
          width="80"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.lowStock"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="SKU编号"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.skuCode"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="80"
          align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleRemoveProductSku(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        style="margin-top: 20px"
        @click="handleRefreshProductSkuList">刷新列表
      </el-button>
      <el-button
        type="primary"
        style="margin-top: 20px"
        @click="handleSyncProductSkuPrice">同步价格
      </el-button>
      <el-button
        type="primary"
        style="margin-top: 20px"
        @click="handleSyncProductSkuStock">同步库存
      </el-button>

    </el-form-item>
    <el-form-item label="商品参数：" style="width: 800px">
      <el-card shadow="never" class="cardBg">
        <div v-for="(item,index) in selectProductParam" :class="{littleMarginTop:index!==0}" :key="item.name">
          <div class="paramInputLabel">{{item.name}}:</div>
          <el-select v-if="item.inputType===1" class="paramInput" v-model="selectProductParam[index].value">
            <el-option
              v-for="item in getParamInputList(item.inputList)"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-input v-else class="paramInput" v-model="selectProductParam[index].value"></el-input>
        </div>
      </el-card>
    </el-form-item>
    <el-form-item  style="width: 700px">
      <el-button size="medium" @click="handlePrev">上一步，填写商品促销</el-button>
      <el-button type="primary" size="medium" @click="handleFinishCommit">完成，提交商品</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import { fetchList as ProductAttrCateList } from '../../../../api/productAttrCate'
  import {fetchList as fetchProductAttrList} from '@/api/productAttr'
  export default {
    data(){
      return{
        //商品属性下拉选项
        productAttributeCategoryOptions:[],
        //选中的商品属性
        selectProductAttr: [],
        //可手动添加的商品属性
        addProductAttrValue: '',
        selectProductParam: [],
      }
    },
    props:{
      value:Object
    },
    created () {
      this.getProductAttrCate()
    },
    methods:{
      getProductAttrCate(){
        let param = {pageNum:1,pageSize:100}
        ProductAttrCateList(param).then(response =>{
          let list= response.data.list;
          for (let i = 0;i<list.length;i++){
            this.productAttributeCategoryOptions.push({label:list[i].name,value:list[i].id})
          }
        })
      },
      handleProductAttrChange(value){
        this.getProductAttrList(0, value);
        this.getProductAttrList(1, value);
      },
      getProductAttrList(type, cid) {
        let param = {pageNum: 1, pageSize: 100, type: type};
        fetchProductAttrList(cid, param).then(response => {
          let list = response.data.list;
          if (type === 0) {
            this.selectProductAttr = [];
            for (let i = 0; i < list.length; i++) {
              let options = [];
              let values = [];
                if (list[i].handAddStatus === 1) {
                  //编辑状态下获取手动添加编辑属性
                  options = this.getEditAttrOptions(list[i].id);
                }
                //编辑状态下获取选中属性
                values = this.getEditAttrValues(i);
              this.selectProductAttr.push({
                id: list[i].id,
                name: list[i].name,
                handAddStatus: list[i].handAddStatus,
                inputList: list[i].inputList,
                values: values,
                options: options
              });
            }
          } else {
            this.selectProductParam = [];
            for (let i = 0; i < list.length; i++) {
              let value=null;
              if(this.isEdit){
                //编辑模式下获取参数属性
                value= this.getEditParamValue(list[i].id);
              }
              this.selectProductParam.push({
                id: list[i].id,
                name: list[i].name,
                value: value,
                inputType: list[i].inputType,
                inputList: list[i].inputList
              });
            }
          }
        });
      },
      //获取设置的可手动添加属性值
      getEditAttrOptions(id){
        let options = [];
        for (let i = 0; i < this.value.productAttributeValueList.length; i++) {
          let attrValue = this.value.productAttributeValueList[i];
          if (attrValue.productAttributeId === id) {
            let strArr = attrValue.value.split(',');
            for (let j = 0; j < strArr.length; j++) {
              options.push(strArr[j]);
            }
            break;
          }
        }
        return options;
      },
      //获取选中的属性值
      getEditAttrValues(index) {
        let values = new Set();
        if (index === 0) {
          for (let i = 0; i < this.value.skuStockList.length; i++) {
            let sku = this.value.skuStockList[i];
            let spData = JSON.parse(sku.spData);
            if (spData!= null && spData.length>=1) {
              values.add(spData[0].value);
            }
          }
        } else if (index === 1) {
          for (let i = 0; i < this.value.skuStockList.length; i++) {
            let sku = this.value.skuStockList[i];
            let spData = JSON.parse(sku.spData);
            if (spData!= null && spData.length>=2) {
              values.add(spData[1].value);
            }
          }
        } else {
          for (let i = 0; i < this.value.skuStockList.length; i++) {
            let sku = this.value.skuStockList[i];
            let spData = JSON.parse(sku.spData);
            if (spData!= null && spData.length>=3) {
              values.add(spData[2].value);
            }
          }
        }
        return Array.from(values);
      },
      //获取属性的值
      getEditParamValue(id){
        for(let i=0;i<this.value.productAttributeValueList.length;i++){
          if(id===this.value.productAttributeValueList[i].productAttributeId){
            return this.value.productAttributeValueList[i].value;
          }
        }
      },
      getInputListArr(inputList) {
        return inputList.split(',');
      },
      handleRemoveProductAttrValue(idx, index) {
        this.selectProductAttr[idx].options.splice(index, 1);
      },
      handleAddProductAttrValue(idx) {
        let options = this.selectProductAttr[idx].options;
        if (this.addProductAttrValue == null || this.addProductAttrValue == '') {
          this.$message({
            message: '属性值不能为空',
            type: 'warning',
            duration: 1000
          });
          return
        }
        if (options.indexOf(this.addProductAttrValue) !== -1) {
          this.$message({
            message: '属性值不能重复',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        this.selectProductAttr[idx].options.push(this.addProductAttrValue);
        this.addProductAttrValue = null;
      },
      getProductSkuSp(row, index) {
        let spData = JSON.parse(row.spData);
        if(spData!=null&&index<spData.length){
          return spData[index].value;
        }else{
          return null;
        }
      },
      handleRemoveProductSku(index, row) {
        let list = this.value.skuStockList;
        if (list.length === 1) {
          list.pop();
        } else {
          list.splice(index, 1);
        }
      },
      handleRefreshProductSkuList() {
        this.$confirm('刷新列表将导致sku信息重新生成，是否要刷新', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.refreshProductAttrPics();
          this.refreshProductSkuList();
        });
      },
      refreshProductSkuList() {
        this.value.skuStockList = [];
        let skuList = this.value.skuStockList;
        //只有一个属性时
        if (this.selectProductAttr.length === 1) {
          let attr = this.selectProductAttr[0];
          for (let i = 0; i < attr.values.length; i++) {
            skuList.push({
              spData: JSON.stringify([{key:attr.name,value:attr.values[i]}])
            });
          }
        } else if (this.selectProductAttr.length === 2) {
          let attr0 = this.selectProductAttr[0];
          let attr1 = this.selectProductAttr[1];
          for (let i = 0; i < attr0.values.length; i++) {
            if (attr1.values.length === 0) {
              skuList.push({
                spData: JSON.stringify([{key:attr0.name,value:attr0.values[i]}])
              });
              continue;
            }
            for (let j = 0; j < attr1.values.length; j++) {
              let spData = [];
              spData.push({key:attr0.name,value:attr0.values[i]});
              spData.push({key:attr1.name,value:attr1.values[j]});
              skuList.push({
                spData: JSON.stringify(spData)
              });
            }
          }
        } else {
          let attr0 = this.selectProductAttr[0];
          let attr1 = this.selectProductAttr[1];
          let attr2 = this.selectProductAttr[2];
          for (let i = 0; i < attr0.values.length; i++) {
            if (attr1.values.length === 0) {
              skuList.push({
                spData: JSON.stringify([{key:attr0.name,value:attr0.values[i]}])
              });
              continue;
            }
            for (let j = 0; j < attr1.values.length; j++) {
              if (attr2.values.length === 0) {
                let spData = [];
                spData.push({key:attr0.name,value:attr0.values[i]});
                spData.push({key:attr1.name,value:attr1.values[j]});
                skuList.push({
                  spData: JSON.stringify(spData)
                });
                continue;
              }
              for (let k = 0; k < attr2.values.length; k++) {
                let spData = [];
                spData.push({key:attr0.name,value:attr0.values[i]});
                spData.push({key:attr1.name,value:attr1.values[j]});
                spData.push({key:attr2.name,value:attr2.values[k]});
                skuList.push({
                  spData: JSON.stringify(spData)
                });
              }
            }
          }
        }
      },
      refreshProductAttrPics() {
        this.selectProductAttrPics = [];
        if (this.selectProductAttr.length >= 1) {
          let values = this.selectProductAttr[0].values;
          for (let i = 0; i < values.length; i++) {
            let pic=null;
              //编辑状态下获取图片
            this.selectProductAttrPics.push({name: values[i], pic: pic})
          }
        }
      },
      getParamInputList(inputList) {
        return inputList.split(',');
      },
      //合并商品属性
      mergeProductAttrValue() {
        this.value.productAttributeValueList = [];
        for (let i = 0; i < this.selectProductAttr.length; i++) {
          let attr = this.selectProductAttr[i];
          if (attr.handAddStatus === 1 && attr.options != null && attr.options.length > 0) {
            this.value.productAttributeValueList.push({
              productAttributeId: attr.id,
              value: this.getOptionStr(attr.options)
            });
          }
        }
        for (let i = 0; i < this.selectProductParam.length; i++) {
          let param = this.selectProductParam[i];
          this.value.productAttributeValueList.push({
            productAttributeId: param.id,
            value: param.value
          });
        }
      },
      handlePrev() {
        this.$emit('prevStep')
      },
      handleFinishCommit(){
        this.$emit('finishCommit');
      },
      handleSyncProductSkuPrice(){
        this.$confirm('将同步第一个sku的价格到所有sku,是否继续', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.value.skuStockList!==null&&this.value.skuStockList.length>0){
            let tempSkuList = [];
            tempSkuList = tempSkuList.concat(tempSkuList,this.value.skuStockList);
            let price=this.value.skuStockList[0].price;
            for(let i=0;i<tempSkuList.length;i++){
              tempSkuList[i].price=price;
            }
            this.value.skuStockList=[];
            this.value.skuStockList=this.value.skuStockList.concat(this.value.skuStockList,tempSkuList);
          }
        });
      },
      handleSyncProductSkuStock(){
        this.$confirm('将同步第一个sku的库存到所有sku,是否继续', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.value.skuStockList!==null&&this.value.skuStockList.length>0){
            let tempSkuList = [];
            tempSkuList = tempSkuList.concat(tempSkuList,this.value.skuStockList);
            let stock=this.value.skuStockList[0].stock;
            let lowStock=this.value.skuStockList[0].lowStock;
            for(let i=0;i<tempSkuList.length;i++){
              tempSkuList[i].stock=stock;
              tempSkuList[i].lowStock=lowStock;
            }
            this.value.skuStockList=[];
            this.value.skuStockList=this.value.skuStockList.concat(this.value.skuStockList,tempSkuList);
          }
        });
      },
    }
  }
</script>
<style scoped>
  .littleMarginLeft {
    margin-left: 10px;
  }

  .littleMarginTop {
    margin-top: 10px;
  }

  .paramInput {
    width: 250px;
  }

  .paramInputLabel {
    display: inline-block;
    width: 100px;
    text-align: right;
    padding-right: 10px
  }

  .cardBg {
    background: #F8F9FC;
  }
</style>
