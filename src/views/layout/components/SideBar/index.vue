<template>
  <el-menu mode="vertical" :show-timout="200"
           :default-active="this.$route.path"
           background-color="#304156"
           text-color="#bfcbd9"
           active-text-color="#409EFF"
           :routes="routers"
           :collapse="isCollapse"
  >
  <sidebar-item :routes="routers"></sidebar-item>
  </el-menu>
</template>
<script>
import SidebarItem from './SidebarItem'
import { mapGetters } from 'vuex'
export default {
  components:{SidebarItem},
  computed: {
    ...mapGetters([//三个.是属性展开符，可以将mapMutations中的方法展开后放入methods中，就可以直接调用了
      'sidebar',
      'routers',
    ]),
    isCollapse(){
      return !this.sidebar.opened
    },
    routes() {
      // return this.$router.options.routes
      // console.log('222')
      // console.log(this.routes)
      return this.routers
    },
  }
}
</script>
<style scoped="scoped">
  .el-menu:not(.el-menu--collapse){
    width: 200px;
    /*min-height: 500px;*/
  }
</style>
