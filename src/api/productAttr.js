import request from '../utils/request'
export function fetchList (cid,params) {
    return request({
      url:'/productAttribute/list/'+cid,
      method:'get',
      params:params
    })
}
export function creatProductAttr (data) {
  return request({
    url:'/productAttribute/create',
    method:'post',
    data:data
  })
}
export function selectProductAttr (id) {
  return request({
    url:'/productAttribute/' + id,
    method:'get',
  })
}
export function updateProductAttr (id,data) {
  return request({
    url:'/productAttribute/update/' + id,
    method:'post',
    data:data
  })
}
export function deleteProductAttr (data) {
  return request({
    url:'/productAttribute/delete',
    method:'post',
    data:data
  })
}
