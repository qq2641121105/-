import request from '../utils/request'
export function getTreeMenu () {
    return request({
      url:'/menu/treeList',
      method:'get'
    })
}
export function menuList (parentId ,params) {
  return request({
    url:'/menu/list/' + parentId,
    method:'get',
    params:params
  })
}
export function updateShowStatus (id ,data) {
  return request({
    url:'/menu/updateHidden/' + id,
    method:'post',
    data:data
  })
}
export function createMenu (data) {
  return request({
    url:'/menu/create',
    method:'post',
    data:data
  })
}
export function updateMenu (id,data) {
  return request({
    url:'/menu/update/' + id,
    method:'post',
    data:data
  })
}
export function deleteMenu (id) {
  return request({
    url:'/menu/delete/' + id,
    method:'post',
  })
}
