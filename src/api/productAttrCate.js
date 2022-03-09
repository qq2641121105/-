import request from '../utils/request'
import da from 'element-ui/src/locale/lang/da'
export function fetchList(params){
  return request({
      url:'/productAttribute/category/list',
      method:'get',
      params:params
  })
}
export function fetchListWithAttr(){
  return request({
    url:'/productAttribute/category/list/withAttr',
    method:'get',
  })
}
export function addAttrCate(data){
  return request({
    url:'/productAttribute/category/create',
    method:'post',
    data:data
  })
}
export function deleteAttrCate(id){
  return request({
    url:'/productAttribute/category/delete/' + id,
    method:'get',
  })
}
