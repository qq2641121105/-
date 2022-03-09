<template>
  <div class="app-container">
    <el-card shadow="never" class="card-top">
      <div>
        <i class="el-icon-search search"/>
        <span class="search">筛选搜索</span>
        <el-button class="search-button" @click="handleSearchList()" type="primary" style=" margin-left: 15px;float: right" size="small">查询结果</el-button>
        <el-button class="reset-button" style="float: right" size="small" @click="handleResetSearch()">重置</el-button>
      </div>
      <div style="margin-top: 40px">
        <el-form :inline="true" size="small" label-width="100px">
          <el-form-item label="输入搜索：">
            <el-input placeholder="商品名称：" style="width: 203px"></el-input>
          </el-form-item>
          <el-form-item label="商品货号：">
            <el-input placeholder="商品货号" style="width: 203px"></el-input>
          </el-form-item>
          <el-form-item label="商品分类：">
           <el-cascader
            v-model="selectProductCateValue"
            :options="productCateOptions"
           ></el-cascader>
          </el-form-item>
          <el-form-item label="商品品牌：" style="margin-left: 10px">
            <el-select placeholder="商品品牌"   v-model="listQuery.brandId" clearable>
              <el-option v-for="item in productBrandOptions"
              :label="item.label"
              :key="item.value"
              :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上架状态：">
            <el-select placeholder="全部" v-model="listQuery.publishStatus" clearable>
              <el-option v-for="item in publishStatusOptions"
                        :label="item.label"
                         :value="item.value"
                         :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态：">
            <el-select placeholder="全部" v-model="listQuery.verifyStatus" clearable>
              <el-option
                v-for="item in verifyStatusOptions"
                :label="item.label"
                :value="item.value"
                :key="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card shadow="never" class="operate-container">
      <i class="el-icon-tickets" style="padding: 5px;float: left"></i>
      <span style="float: left">数据列表</span>
      <el-button size="mini" style="float: right;margin-bottom: 12px" @click="handleAddProduct()">添加</el-button>
    </el-card>
    <el-table border :data="list">
      <el-table-column type="selection" width="60" align="center"></el-table-column>
      <el-table-column prop="id" label="编号" width="=180" align="center"></el-table-column>
      <el-table-column label="图片" width="180" align="center">
        <template slot-scope="scope"><img  :src="scope.row.pic" style="height: 80px"/></template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" width="=180" align="center"></el-table-column>
      <el-table-column label="价格/货号" width="=180" align="center">
        <template slot-scope="scope">
          <p>价格：{{scope.row.price}}￥</p>
          <p>货号：{{scope.row.productSn}}</p>
        </template>
      </el-table-column>
      <el-table-column label="标签" width="=180" align="center">
        <template slot-scope="scope">
          <p>上架：
            <el-switch
              @change="handlePublishStatusChange(scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.publishStatus">
            </el-switch>
          </p>
          <p>新品：
            <el-switch
              @change="handleNewStatusChange(scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.newStatus">
            </el-switch>
          </p>
          <p>推荐：
            <el-switch
              @change="handleRecommendStatusChange(scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.recommandStatus">
            </el-switch>
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="=180" align="center"></el-table-column>
      <el-table-column label="SKU库存" width="100" align="center">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" @click="handleEditSkuInfo(scope.row)"></el-button>
      </template>
      </el-table-column>
      <el-table-column prop="sale" label="销量" width="=180" align="center"/>
      <el-table-column label="审核状态" width="100" align="center">
        <template slot-scope="scope">
          <p>{{scope.row.verifyStatus | verifyStatusFilter}}</p>
          <p>
            <el-button
              type="text"
              >审核详情
            </el-button>
          </p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <p>
            <el-button
              size="mini">查看
            </el-button>
            <el-button
              size="mini">编辑
            </el-button>
          </p>
          <p>
            <el-button
              size="mini">日志
            </el-button>
            <el-button
              size="mini"
              @click="handleUpdataDeleteProduct(scope.row)"
              type="danger">删除
            </el-button>
          </p>
        </template>
      </el-table-column>
    </el-table>
    <div class="batch-operate-container" style="float: left">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        type="primary"
        size="small">
        确定
      </el-button>
    </div>
    <div class="pagination-container" style="float: right">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total"
        >
      </el-pagination>
    </div>
    <el-dialog title="编辑货品信息" :visible.sync="editSkuInfo.dialogVisible" width="50%">
      <span>商品货号:{{editSkuInfo.productSn}}</span>
      <el-input placeholder="按sku编号搜索" style="width: 300px;margin-left: 10px" size="small" v-model="editSkuInfo.keyword"></el-input>
      <el-button icon="el-icon-search" size="small" @click="handleSearchEditSku"></el-button>
      <el-table :data="editSkuInfo.skuList"  border style="margin-top: 10px">
        <el-table-column
          label="SKU编号"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.skuCode"></el-input>
          </template>
        </el-table-column>
        <el-table-column v-for="(item,index) in editSkuInfo.productAttr" :key="item.id" :label="item.name">
          <template slot-scope="scope">
            {{getProductSkuSp(scope.row,index)}}
          </template>
        </el-table-column>
        <el-table-column label="销售价格">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="商品库存">
          <template slot-scope="scope">
            <el-input v-model="scope.row.stock"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="库存预警值">
          <template slot-scope="scope">
            <el-input v-model="scope.row.lowStock"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-button @click="editSkuInfo.dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleEditSkuConfirm">确定</el-button>
    </el-dialog>
  </div>
</template>
<script>
  import {fetchListWithChiledren} from '../../../api/productCate'
  import {fetchBrandList} from '../../../api/brand'
  import {fetchList,updatePublishStatus,updateNewStatus,updateRecommendStatus,updataDeleteProductStatus} from '../../../api/product'
  import {fetchList as getSkuList,updataSkuStockList} from '../../../api/skuStock'
  import {fetchList as fetchProductAttrList} from '../../../api/productAttr'
  const defaultListQuery = {
    keyword: null,
    pageNum: 1,
    pageSize: 5,
    publishStatus: null,
    verifyStatus: null,
    productSn: null,
    productCategoryId: null,
    brandId: null
  };
  export default {
  data(){
    return{
      productCateOptions:[],
      listQuery: Object.assign({}, defaultListQuery),
      selectProductCateValue:null,
      productBrandOptions:[],
      list:[],
      editSkuInfo:{
        dialogVisible:false,
        productSn:'',
        keyword:'',
        skuList:[],
        productAttr:[],
        productId:''
      },
      publishStatusOptions:[
        {
          value: 1,
          label: '上架'
        }, {
          value: 0,
          label: '下架'
        }],
      verifyStatusOptions: [{
        value: 1,
        label: '审核通过'
      }, {
        value: 0,
        label: '未审核'
      }],
      operates: [
        {
          label: "商品上架",
          value: "publishOn"
        },
        {
          label: "商品下架",
          value: "publishOff"
        },
        {
          label: "设为推荐",
          value: "recommendOn"
        },
        {
          label: "取消推荐",
          value: "recommendOff"
        },
        {
          label: "设为新品",
          value: "newOn"
        },
        {
          label: "取消新品",
          value: "newOff"
        },
        {
          label: "转移到分类",
          value: "transferCategory"
        },
        {
          label: "移入回收站",
          value: "recycle"
        }
      ],
      operateType: null,
      total: null,
    }
  },
  created () {
    this.getProductCateList()
    this.getProductBrandList()
    this.getList()
  },
    watch:{
      selectProductCateValue:function (newValue) {
          if (newValue!=null && newValue.length == 2){
            this.listQuery.productCategoryId = newValue[1]
          }else {
            this.listQuery.productCategoryId = null;
          }
      }
    },
    filters: {
      verifyStatusFilter(value) {
        if (value === 1) {
          return '审核通过';
        } else {
          return '未审核';
        }
      }
    },
    methods:{
      getProductSkuSp(row, index) {
        let spData = JSON.parse(row.spData);
        // console.log(spData)
        if(spData!=null&&index<spData.length){
          return spData[index].value;
        }else{
          return null;
        }
      },
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
      getList(){
        fetchList(this.listQuery).then(response => {
           this.list = response.data.list
          this.total = response.data.total;
        })
      },
      handleResetSearch(){
        this.selectProductCateValue = [];
        this.listQuery = Object.assign({}, defaultListQuery);
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
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleAddProduct(){
        this.$router.push({ path: '/pms/addProduct' })
      },
      handlePublishStatusChange(row){
        let ids = [];
        ids.push(row.id)
        this.updatePublishStatus(row.publishStatus,ids)
      },
      handleNewStatusChange(row){
        let ids = row.id;
        this.updateNewStatus(row.newStatus,ids)
      },
      handleRecommendStatusChange(row){
        let ids = [];
        ids.push(row.id)
        this.updateRecommendStatus(row.recommandStatus,ids)
      },
      handleEditSkuInfo(row){
        this.editSkuInfo.dialogVisible = true
        this.editSkuInfo.keyword = null
        this.editSkuInfo.productSn = row.productSn
        this.editSkuInfo.productId = row.id
        getSkuList(row.id,{keyword:this.editSkuInfo.keyword}).then(response =>{
          this.editSkuInfo.skuList = response.data
          console.log(this.editSkuInfo.skuList)
        })
        if(row.productAttributeCategoryId!=null){
          fetchProductAttrList(row.productAttributeCategoryId,{type:0}).then(response=>{
            this.editSkuInfo.productAttr=response.data.list;
            // console.log(this.editSkuInfo.productAttr)
          });
        }
      },
      handleSearchEditSku(){
        getSkuList(this.editSkuInfo.productId,{keyword:this.editSkuInfo.keyword}).then(response =>{
          this.editSkuInfo.skuList=response.data;
        })
      },
      handleEditSkuConfirm(){
        if(this.editSkuInfo.skuList==null||this.editSkuInfo.skuList.length<=0){
          this.$message({
            message: '暂无sku信息',
            type: 'warning',
            duration: 1000
          });
          return
        }
        this.$confirm('是否要进行修改','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type: 'warning'
        }).then(() => {
          updataSkuStockList(this.editSkuInfo.productId,this.editSkuInfo.skuList).then(response =>{
            this.$message({
              message:'修改成功',
              type:'success',
              duration:1000
            })
            this.editSkuInfo.dialogVisible = false
          })
        }).catch()
      },
      handleUpdataDeleteProduct(row){
        this.$confirm('是否删除该商品','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(() =>{
          let ids = []
          ids.push(row.id)
          this.updataProductDeleteStatus(1,ids)
        })
      },
      updataProductDeleteStatus(deleteStatus,ids){
          let params = new URLSearchParams();
          params.append('ids',ids)
          params.append('deleteStatus',deleteStatus)
        updataDeleteProductStatus(params).then(response =>{
          this.$message({
            message:'删除成功',
            type:'success',
            duration:1000
          })
          this.getList()
        })
      },
      updatePublishStatus(publishStatus,ids){
        let params = new URLSearchParams();
        params.append('ids',ids)
        params.append('publishStatus',publishStatus)
        updatePublishStatus(params).then(response =>{
          this.$message({
            message:'修改成功',
            type:'success',
            duration:1000
          })
        })
      },
      updateNewStatus(newStatus,ids){
        let params = new URLSearchParams()
        params.append('ids',ids)
        params.append('newStatus',newStatus)
        updateNewStatus(params).then(response =>{
          this.$message({
            message:'修改成功',
            type:'success',
            duration:1000
          })
        })
      },
      updateRecommendStatus(recommendStatus,ids){
        let params = new URLSearchParams()
        params.append('ids',ids)
        params.append('recommendStatus',recommendStatus)
        updateRecommendStatus(params).then(response =>{
          this.$message({
            message:'修改成功',
            type:'success',
            duration:1000
          })
        })
      }
    }
}
</script>
<style scoped="scoped">
.search{
    float: left;
  }
  .el-icon-search{
    padding-right: 5px;
    padding-top: 5px;
  }
  .card-top,.operate-container{
    margin-bottom: 10px;
  }
  .search-two{
    margin-top: 60px;
  }
</style>
