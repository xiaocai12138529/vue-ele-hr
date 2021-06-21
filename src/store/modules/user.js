import { setToken, removeToken } from '@/utils/auth.js'
import { login } from '@/api/user.js'
export default {
  namespaced: true,
  state: {
    token: null
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
    }
  },
  actions: {
    // 登录请求
    async login(context, loginFrom) {
      const res = await login(loginFrom)
      context.commit('setToken', res.data)
    }
  }
}
