<template>
  <div class="app-wrapper">
    <el-container>
            <!--        左侧区域-->
<!--      <el-aside style="background-color: rgb(48, 65, 86)" width="200px">-->
                <sidebar class="sidebar-container"></sidebar>
<!--      </el-aside>-->
<!--          右侧区域-->
            <el-container>
                <!--              头部区域-->
                <el-header style="text-align: right; font-size: 12px">
                  <nav-bar class="header-fold"></nav-bar>
                </el-header>
                <!--              主体区域-->
              <el-main>
                <app-main class="app-main"></app-main>
              </el-main>
            </el-container>
    </el-container>
  </div>
</template>
<script>
import NavBar from './components/NavBar'
import {getMenu} from '../../api/getMenu'
import { Navbar, Sidebar, AppMain } from './components'
export default {
  components:{
      NavBar,
    Sidebar,
    AppMain
  },
  created () {
  }
}
</script>
<style scoped="scoped">
  .el-container,.app-wrapper{
    height: 100% ;
  }
</style>
