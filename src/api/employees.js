import request from '@/utils/request'

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
