import request from '../utils/request'
import da from 'element-ui/src/locale/lang/da'
export function fetchList (parentID,params) {
    return request({
      url:'/productCategory/list/' + parentID,
      method:'get',
      params:params
    })
}
export function fetchListWithChiledren() {
  return request({
    url:'/productCategory/list/withChildren',
    method:'get'
  })
}
export function updataNavStatus (data) {
  return request({
    url:'/productCategory/update/navStatus',
    method:'post',
    data:data
  })
}
export function updataShowStatus (data) {
  return request({
    url:'/productCategory/update/showStatus',
    method:'post',
    data:data
  })
}
export function creaProductCate (data) {
 return request({
   url:'/productCategory/create',
   method:'post',
   data:data
 })
}
export function deleteProductCate (id) {
  return request({
    url:'/productCategory/delete/' + id,
    method:'post',
  })
}
