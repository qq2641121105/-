<template>
  <div align="center">
  <el-card style="width: 60%" shadow="never">
    <el-tree
      ref="tree"
      default-expand-all
     :data="menuList"
     show-checkbox
     node-key="id"
      :props="defaultProps"
    >
    </el-tree>
    <div>
      <el-button @click="handleClear">清空</el-button>
      <el-button @click="handleSave" type="primary">确定</el-button>
    </div>
  </el-card>
  </div>
</template>
<script>
  import {getTreeMenu} from '@/api/menu'
  import {roleMenu,allocMenu} from '@/api/role'
  export default {
    data(){
      return{
        menuList:[],
        roleMenu:[],
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        roleId:null
      }
    },
    created () {
      this.roleId = this.$route.query.id
      this.getList()
      this.getRoleMenu()
      },
    methods:{
        getList(){
          //获取所有菜单
          getTreeMenu().then(response =>{
            this.menuList = response.data;
          })
        },
        getRoleMenu(){
          //获取角色相关菜单
          roleMenu(this.roleId).then(response =>{
            this.roleMenu = []
            let list = response.data
            if (list !=null&list.length>0){
              for (let i = 0;i < list.length;i++){
                if (list[i].level == 1) this.roleMenu.push(list[i].id)
              }
            }
            this.$refs.tree.setCheckedKeys(this.roleMenu)
          })
        },
        handleClear(){
        this.$refs.tree.setCheckedKeys([])
      },
        handleSave(){
          let menuIds = this.$refs.tree.getCheckedKeys()
          let data = new URLSearchParams()
          data.append('roleId',this.roleId)
          data.append('menuIds',menuIds)
          allocMenu(data).then(response=>{
            this.$message({
              message:'保存成功',
              type:'success',
              duration:1000
            })
          })
          this.$router.push({path:'/ums/role'})
      }
    }
  }
</script>
