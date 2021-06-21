import { setToken, removeToken } from '@/utils/auth.js'
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
  actions: {}
}
