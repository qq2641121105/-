import request from '../utils/request'
export function adminList (params) {
  return request({
    url:'/admin/list',
    method:'get',
    params:params
  })
}
export function updateStatus (id,params) {
  return request({
    url:'/admin/updateStatus/' + id,
    method:'post',
    params:params
  })
}
export function createUser (data) {
  return request({
    url:'/admin/register',
    method:'post',
    data:data
  })
}
export function getUser (id) {
  return request({
    url:'/admin/' + id,
    method:'get',
  })
}
export function updataUserInfo (id,data) {
  return request({
    url:'/admin/update/' + id,
    method:'post',
    data:data
  })
}
export function removeUser (id) {
  return request({
    url:'/admin/delete/' + id,
    method:'post',
  })
}
export function allocRole (params) {
  return request({
    url:'/admin/role/update',
    method:'post',
    params:params
  })
}
export function adminRole (id) {
  return request({
    url:'/admin/role/' + id,
    method:'get',
  })
}
