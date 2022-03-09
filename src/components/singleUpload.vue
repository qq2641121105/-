<template>
  <div>图片上传
  <el-upload
  class="upload-demo"
  action="http://localhost:8080/minio/upload"
  :on-success="handleSuccess"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>>
  </div>
</template>
<script>
  export default {
    methods:{
      handleSuccess(res,file){
        console.log(res)
        console.log(file)
      }
    }

  }
</script>
