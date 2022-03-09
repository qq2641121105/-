<template>
  <div>
    <el-card style="width: 50%">
      <el-form :model="menuForm">
        <el-form-item label="菜单名称：" label-width="100px">
          <el-input v-model="menuForm.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单：" label-width="100px">
          <el-select v-model="menuForm.parentId" style="float: left">
              <el-option v-for="item in menuList" :label="item.title"
              :key="item.id" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="前端名称：" label-width="100px">
          <el-input  v-model="menuForm.name"></el-input>
        </el-form-item>
        <el-form-item label="是否显示：" label-width="100px">
          <el-radio-group style="float: left;padding-top: 12px" v-model="menuForm.hidden">
            <el-radio :label="0">是</el-radio>
            <el-radio :label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序：" label-width="100px">
          <el-input  v-model="menuForm.sort"></el-input>
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
  import {getTreeMenu,createMenu,updateMenu} from '@/api/menu'
  const defaultMenu = {
    title: '',
    parentId: 0,
    name: '',
    icon: '',
    hidden: 0,
    sort: 0
  }
  export default {
    data(){
      return{
          menuForm:Object.assign({},defaultMenu),
        menuList:[]
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
        this.menuForm = this.$route.query.menu
        console.log(this.menuForm)
      }
      this.getList()
    },
    methods:{
      getList(){
        getTreeMenu().then(response =>{
          this.menuList = response.data
          this.menuList.unshift({title:'无上级分类',id:0})
        })
      },
      handleResForm(){
        this.menuForm = defaultMenu
      },
      handleSubmit(){
        if (this.isEdit){
          updateMenu(this.menuForm.id,this.menuForm).then(response=>{
            this.$message({
              message:'修改成功',
              type:'success',
              duration:1000
            })
            this.$router.push({path:'/ums/menu'})
          })
        }else {
          createMenu(this.menuForm).then(response=>{
            this.$message({
              message:'提交成功',
              type:'success',
              duration:1000
            })
            this.$router.push({path:'/ums/menu'})
          })
        }
      }
    }
  }
</script>
<style scoped="scoped">
  .el-input{
    width: 400px;
    float: left;
  }
</style>
