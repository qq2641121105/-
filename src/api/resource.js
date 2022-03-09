import request from '../utils/request'
export function fetchAllResourceList (params) {
  return request({
    url:'/resource/list',
    method:'get',
    params:params
  })
}
export function addResource (data) {
  return request({
    url:'/resource/create',
    method:'post',
    data:data
  })
}
export function updateResource (id,data) {
  return request({
    url:'/resource/update/' + id,
    method:'post',
    data:data
  })
}
export function deleteResource (id) {
  return request({
    url:'/resource/delete/' + id,
    method:'post',
  })
}
