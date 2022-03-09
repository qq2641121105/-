<template>
  <div class="navbar">
    <el-button :icon=icon class="fold" @click="toggleSideBar"></el-button>
<!--    头像--下拉菜单-->
    <el-dropdown class="avatar-container" trigger="click">
    <img class="user-avatar" src="../../../assets/img/shenlitoux.png">
      <i class="el-icon-caret-bottom"></i>
      <el-dropdown-menu slot="dropdown">
        <router-link :to="{path:'/home'}">
        <el-dropdown-item>首页</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="loginOut">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
<!--      <span class="navigation">{{message}}</span>-->
      <breadcrumb class="navigation"></breadcrumb>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import Cookies from 'js-cookie'
  import Breadcrumb from '../../../components/Breadcrumb'
  export default {
    components:{
      Breadcrumb
    },
    data(){
      return{
        message:'home',
        icon:'el-icon-s-fold'
      }
    },
    methods:{
      loginOut(){
        this.$store.dispatch('LoginOut').then(()=>{
            location.reload()//刷新页面
        })
      },
      toggleSideBar(){
        this.$store.dispatch('ToggleSideBar')
        if (Cookies.get('sidebarStatus') == 1) this.icon = 'el-icon-s-unfold'
        else this.icon = 'el-icon-s-fold'
      }
    }
  }
</script>
<style scoped="scoped">
  .navbar{
    padding-top: 10px;
  }
.fold{
  float: left;
}
.navigation{
  float: left;
  margin: 15px;
}
.avatar-container{
  float: right;
  }
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
</style>

