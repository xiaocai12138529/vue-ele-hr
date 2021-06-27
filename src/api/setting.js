import request from '@/utils/request'

export const getRoles = (params) => {
  return request({
    url: '/sys/role',
    method: 'GET',
    'params': params
  })
}
export const delRole = (id) => {
  return request({
    url: '/sys/role/' + id,
    method: 'DELETE'
  })
}
