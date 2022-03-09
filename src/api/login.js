import request from '../utils/request'
export function login(username, password) {
  return request({
    url: '/admin/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
export function logout () {
    return request({
        url:'/admin/logout',
        method:'post'
    })
}
//获取用户信息
export function getinfo () {
  return request({
      url:'/admin/info',
      method:'get'
  })
}
