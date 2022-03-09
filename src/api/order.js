import request from '../utils/request'
export function orderList (params) {
  return request({
    url:'/order/list',
    method:'get',
    params:params
  })
}
export function orderInfo (id) {
  return request({
    url:'/order/' + id,
    method:'get',
  })

}
