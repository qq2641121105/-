import Vue from 'vue'
import Vuex from 'vuex'
import app from './module/app'
import user from './module/user'
import getters from './getter'
import permission from './module/permission'

Vue.use(Vuex)
const store = new Vuex.Store({
    modules:{
      app,
      user,
      permission,
    },
  getters,
})
export default store
