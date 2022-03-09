<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
        <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
  <script>
  export default {
    created() {
      this.getBreadcrumb()
    },
    // 键值一体，键为$route，值为$route()方法
    watch: {
      $route() {
        this.getBreadcrumb()
      }
    },
    data(){
      return {
        levelList:null
      }
    },
    methods: {
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.name)
        const first = matched[0]
        if (first && first.name !== 'home') {
          matched = [{ path: '/home', meta: { title: '首页' }}].concat(matched)
        }
        this.levelList = matched
      }
    }
  }
  </script>

