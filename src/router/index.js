import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'
Vue.use(Router)
export const constantRouterMap = [
  {path: '/login',component:()=>import('../views/login/login'),hidden:true},
  {path: '/',
    component:Layout,
   redirect:'/home',
    // meta: {title: '首页', icon: 'el-icon-s-home'},
    // hidden: true,
    children:[{
    path:'home',
      name:'home',
      component:() => import('../views/home/home'),
      meta: {title: '首页', icon: 'el-icon-s-home'}
    }]
  }
]
export const asyncRouterMap = [
  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/product',
    name: 'pms',
    meta: {title: '商品', icon: 'el-icon-s-goods'},
    children: [{
      path: 'product',
      name: 'product',
      component: () => import('@/views/pms/product/index'),
      meta: {title: '商品列表', icon: 'product-list'}
    }, {
      path: 'addProduct',
      name: 'addProduct',
      component: () => import('@/views/pms/product/add'),
      meta: {title: '添加商品', icon: 'product-add'}
    },
      {
        path: 'productCate',
        name: 'productCate',
        component: () => import('@/views/pms/productCate/index'),
        meta: {title: '商品分类', icon: 'product-add'}
      },
      {
        path: 'updateProductCate',
        name: 'updateProductCate',
        component: () => import('@/views/pms/productCate/update'),
        meta: {title: '修改商品分类'},
        hidden: true
      },
      {
        path: 'addProductCate',
        name: 'addProductCate',
        component: () => import('@/views/pms/productCate/add'),
        meta: {title: '添加商品分类'},
        hidden: true
      },
      {
        path: 'productAttr',
        name: 'productAttr',
        component: () => import('@/views/pms/productAttr/index'),
        meta:{title:'商品类型'},
      },
      {
        path: 'productAttrList',
        name: 'productAttrList',
        component: () => import('@/views/pms/productAttr/productAttrList'),
        meta: {title: '商品属性列表'},
        hidden: true
      },
      {
        path: 'addproductAttr',
        name: 'addproductAttr',
        component: () => import('@/views/pms/productAttr/addProductAttr'),
        meta: {title: '添加商品属性'},
        hidden: true
      },
      {
        path: 'updateProductAttr',
        name: 'updateProductAttr',
        component: () => import('@/views/pms/productAttr/updateProductAttr'),
        meta: {title: '修改商品属性'},
        hidden: true
      },
      {
        path: 'brand',
        name: 'brand',
        component: () => import('@/views/pms/brand/index'),
        meta:{title:'品牌管理'},
      },
      {
        path: 'addBrand',
        name: 'addBrand',
        component: () => import('@/views/pms/brand/add'),
        meta: {title: '添加品牌'},
        hidden: true
      },
      {
        path: 'editBrand',
        name: 'editBrand',
        component: () => import('@/views/pms/brand/edit'),
        meta: {title: '编辑品牌'},
        hidden: true
      },
    ]
  },
  {
    path: '/oms',
    component: Layout,
    redirect: '/oms/order',
    name: 'oms',
    meta: {title: '订单', icon: 'el-icon-s-order'},
    children: [{
      path: 'order',
      name: 'order',
      component: () => import('@/views/oms/order/index'),
      meta: {title: '订单列表'}
    },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        component: () => import('@/views/oms/order/orderDetail'),
        meta: {title: '订单详情'},
        hidden:true
      },
      {
        path: 'orderSetting',
        name: 'orderSetting',
        component: () => import('@/views/oms/order/setting'),
        meta: {title: '订单设置'}
      },
      {
        path: 'returnApply',
        name: 'returnApply',
        component: () => import('@/views/oms/apply/index'),
        meta: {title: '退货申请处理', icon: 'order-return'}
      },
      {
        path: 'returnReasonDetail',
        name: 'returnReasonDetail',
        component: () => import('@/views/oms/apply/deatil'),
        meta: {title: '退货原因详情'},
        hidden: true
      },
    ]
  },
  {
    path:'/ums',
    component: Layout,
    redirect: '/ums/admin',
    name: 'ums',
    meta: {title: '权限', icon: 'el-icon-user-solid'},
    children: [
      {path: 'admin',
      name:'admin',
      component:() => import('@/views/ums/admin/index'),
      meta: {title: '用户列表'}
      },
      {
        path: 'role',
        name: 'role',
        component:() => import('@/views/ums/role/index'),
        meta: {title: '角色列表'}
      },
      {
        path: 'resource',
        name: 'resource',
        component:() => import('@/views/ums/resource/index'),
        meta: {title: '资源列表'}
      },
      {
        path: 'allocMenu',
        name: 'allocMenu',
        component:() => import('@/views/ums/role/allocMenu'),
        meta: {title: '分配菜单'},
        hidden: true
      },
      {
        path: 'allocResource',
        name: 'allocResource',
        component:() => import('@/views/ums/role/allocResource'),
        meta: {title: '分配资源'},
        hidden: true
      },
      {
        path: 'ResourceCate',
        name: 'ResourceCate',
        component:() => import('@/views/ums/resource/resourceCate'),
        meta: {title: '资源分类'},
        hidden: true
      },
      {
        path: 'menu',
        name: 'menu',
        component:() => import('@/views/ums/menu/index'),
        meta: {title: '菜单列表'},
      },
      {
        path: 'addMenu',
        name: 'addMenu',
        component:() => import('@/views/ums/menu/add'),
        meta: {title: '添加菜单'},
        hidden: true
      },
      {
        path: 'editMenu',
        name: 'editMenu',
        component:() => import('@/views/ums/menu/edit'),
        meta: {title: '编辑菜单'},
        hidden: true
      },
    ]
  }
]
// const router = new Router({
//   scrollBehavior: () => ({y: 0}),
//   routes: constantRouterMap
// })
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
// export default router
export default new Router({
  // mode: 'history', //后端支持可开
  routes: constantRouterMap
})
