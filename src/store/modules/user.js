import { setToken, removeToken, getToken } from '@/utils/auth.js'
import { login, getInfo, getUserDetailById } from '@/api/user.js'
export default {
  namespaced: true,
  state: {
    token: getToken() || null,
    getUserInfo: {}
  },
  mutations: {
    setToken(state, newToken) {
      state.token = newToken
      // 保存到cookie
      setToken(newToken)
    },
    delToken(state, newToken) {
      state.token = null
      removeToken()
    },
    setUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo
    }
  },
  actions: {
    // 登录请求
    async login(context, loginFrom) {
      const res = await login(loginFrom)
      context.commit('setToken', res.data)
    },
    // 获取用户信息
    async getUserInfo(context) {
      const res = await getInfo()
      const resPhoto = await getUserDetailById(res.data.userId)
      console.log('userInfo', res, resPhoto)
      context.commit('setUserInfo', { ...res.data, ...resPhoto.data })
    }
  }
}
