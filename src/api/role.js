import request from '../utils/request'
export function roleList () {
  return request({
    url:'/role/listAll',
    method:'get',
  })
}
export function fecthList (params) {
  return request({
    url:'/role/list',
    method:'get',
    params:params
  })
}
export function updateStatus (id,params) {
  return request({
    url:'/role/updateStatus/' + id,
    method:'post',
    params:params
  })
}
export function createRole (data) {
  return request({
    url:'/role/create',
    method:'post',
    data:data
  })
}
export function updateRoleInfo (id,data) {
  return request({
    url:'/role/update/' + id,
    method:'post',
    data:data
  })
}
export function getRoleInfo (roleId) {
  return request({
    url:'/role/listResource/' + roleId,
    method:'get',
  })
}
export function roleMenu (roleId) {
  return request({
    url:'/role/listMenu/' + roleId,
    method:'get',
  })
}
export function allocMenu (data) {
  return request({
    url:'/role/allocMenu',
    method:'post',
    data:data
  })
}
export function allocResource(data) {
  return request({
    url: '/role/allocResource',
    method: 'post',
    data: data
  })
}
export function removeRole(data) {
  return request({
    url: '/role/delete',
    method: 'post',
    data:data
  })
}
