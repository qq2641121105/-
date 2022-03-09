import axios from 'axios'
import {Message,MessageBox} from 'element-ui'
import store from '../store'
import {getToken} from './auth'

//创建axios实列
const service = axios.create({
    baseURL:'http://localhost:8080',
    timeout:15000
})

// request拦截器
service.interceptors.request.use(config =>{
    if (store.getters.token) config.headers['Authorization'] =getToken();//如果存在token则让每个请求携带token
    return config;
},error => {
    console.log(error)
    Promise.reject(error)
})

//reponse拦截器
service.interceptors.response.use(response =>{
/**
 *  code非200时，可结合自己的业务修改
 *  */
 const  res = response.data
  if(res.code !== 200){
      Message({
          message:res.message,
          type:'error',
          duration:3 * 100
      })
    // 401:未登录;
    if (res.code === 401) {
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload()// 为了重新实例化vue-router对象 避免bug
        })
      })
    }
    return Promise.reject('error')
  }else return response.data
},
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  })
export default service;
