import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
/**
 * 获取用户信息
 * @returns userInfo
 */
export function getInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

/**
 * @description: 获取用户头像
 * @param {*} id 用户id
 * @return {*}
 */
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
