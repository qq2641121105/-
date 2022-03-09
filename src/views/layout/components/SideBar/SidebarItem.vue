<template>
  <fragment class="menu-wrapper">
<!--    获取第一场item-->
<template v-for="item in handleroutes">
<!--  首页-->
  <router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children" :to="item.path+item.children[0].path"
               :key="item.children[0].name">
    <el-menu-item :index="item.path+'/'+item.children[0].path">
     <i :class="item.children[0].meta.icon"></i>
      <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{item.children[0].meta.title}}</span>
    </el-menu-item>
  </router-link>
<!--  一级菜单-->
  <el-submenu :index="item.name" :key="item.name" v-if="item.meta">
    <template slot="title">
      <i v-if="item.meta&&item.meta.icon" :class="item.meta.icon"></i>
      <span  v-if="item.meta&&item.meta.title&&item.meta">{{item.meta.title}}</span>
    </template>
<!--    二级菜单-->
    <template v-for="child in item.children">
    <router-link  :key="child.name" :to="item.path+'/'+child.path">
      <el-menu-item v-if="!child.hidden" :index="item.path+'/'+child.path" :key="child.name">
        <span class="two-span" style="padding-left: 50px">{{child.meta.title}}</span>
      </el-menu-item>
    </router-link>
    </template>
  </el-submenu>


</template>
  </fragment>
</template>
<script>
  export default {
    name: 'SidebarItem',
    props: {
      routes: {
        type: Array
      },
      isNest: {
        type: Boolean,
        default: false
      }
    },
   computed:{
     handleroutes(){
       // console.log(this.routes)
       return this.routes.filter(item =>{
         return !item.hidden&&item.children
       })
     }
   },
    methods: {
      hasOneShowingChildren(children) {
        if (children.length === 1) return true
        return false
      }
    }
  }
</script>
<style scoped="scoped">
  .two-span{
    margin-left: 0px !important;
  }
</style>
