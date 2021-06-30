import request from '@/utils/request'

/**
 * @description: 添加员工
 * @param {*} data
 * @return {*}
 */
export function addEmployee(data) {
  return request({
    method: 'POST',
    url: '/sys/user',
    data: data
  })
}

// 删除员工信息
export function delEmployee(id) {
  return request({
    url: '/sys/user/' + id,
    method: 'DELETE'
  })
}
/**
 * @description: 获取下拉员工数据
 * @param {*}
 * @return {*}
 */
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

// 获取员工信息
export function getEmployee(params) {
  return request({
    url: '/sys/user',
    method: 'GET',
    params
  })
}
// 添加部门
export function addDpartment(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}

// 获取部门信息
export function getDpartment(id) {
  return request({
    url: '/company/department/' + id
  })
}

// 修改部门信息
export function updDpartment(id) {
  return request({
    url: '/company/department/' + id,
    method: 'PUT'
  })
}
// 删除部门信息
export function delDpartment(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
