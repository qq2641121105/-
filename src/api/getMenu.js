import request from '../utils/request'
export function getMenu () {
  return request({
    url:'/menu/3',
    method: 'get',
  })

}
