import request from '@/utils/request'
// 查询角色
export const getRoles = (params) => {
  return request({
    url: '/sys/role',
    method: 'GET',
    'params': params
  })
}
// 删除角色
export const delRole = (id) => {
  return request({
    url: '/sys/role/' + id,
    method: 'DELETE'
  })
}
// 添加角色
export const addRole = (from) => {
  return request({
    url: '/sys/role/',
    method: 'POST',
    data: from
  })
}
// 修改角色
export const updRole = (from) => {
  return request({
    url: '/sys/role/' + from.id,
    method: 'PUT',
    data: from
  })
}
