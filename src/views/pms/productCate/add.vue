<template>
  <product-cate-detail :isEdit = false align="center"></product-cate-detail>
</template>
<script>
  import productCateDetail from './components/productCateDetail'
  export default {
    name: 'addProductCate',
    components:{
      productCateDetail
    }
  }
</script>
