import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken ,removeToken} from '@/utils/auth'
const whiteList = ['/login'] // 不重定向白名单
router.beforeEach(((to, from, next) => {
  // removeToken()
  if (getToken()){
    if (to.path === '/login') {
      next({path:'/'})
    }else {
      console.log(store.getters.roles.length)
      if (store.getters.roles.length === 0){
        store.dispatch('GetInfo').then(res =>{
          let menus=res.data.menus;
          let username=res.data.username;
          store.dispatch('GenerateRoutes', { menus,username }).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
            next({ ...to, replace: true })
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      }else {
        next()
      }
    }
  }else {
    if (whiteList.indexOf(to.path)!==-1){
      next()
    }else {
      next('/login')
    }

  }
}))
