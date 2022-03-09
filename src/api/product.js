import request from '../utils/request'
import da from 'element-ui/src/locale/lang/da'
export function fetchList (params) {
  return request({
    url:'/product/list',
    method:'get',
    params:params
  })
}
export function createProduct(data) {
  return request({
    url:'/product/create',
    method:'post',
    data:data
  })
}
export function updatePublishStatus(params) {
  return request({
    url:'/product/update/publishStatus',
    method:'post',
    params:params
  })
}
export function updateNewStatus(params) {
  return request({
    url:'/product/update/newStatus',
    method:'post',
    params:params
  })
}
export function updateRecommendStatus(params) {
  return request({
    url:'/product/update/recommendStatus',
    method:'post',
    params:params
  })
}
export function updataDeleteProductStatus (params) {
  return request({
    url:'/product/update/deleteStatus',
    method:'post',
    params:params
  })

}
