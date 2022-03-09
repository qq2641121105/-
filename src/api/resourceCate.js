import request from '../utils/request'
export function listAllCate () {
  return request({
    url:'/resourceCategory/listAll',
    method:'get',
  })
}
export function addResourceCategory (data) {
  return request({
    url: '/resourceCategory/create',
    method: 'post',
    data: data
  })
}
export function updateCate (id,data) {
  return request({
    url: '/resourceCategory/update/' + id,
    method: 'post',
    data: data
  })
}
export function deleteCate (id) {
  return request({
    url: '/resourceCategory/delete/' + id,
    method: 'post',
  })
}
