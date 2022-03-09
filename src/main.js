import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import './icons'
import './styles/index.css'
import store from './store'
import './permission'
import Fragment from 'vue-fragment'
Vue.config.productionTip = false
Vue.use(ElementUI,{ locale })
Vue.use(Fragment.Plugin)
new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
