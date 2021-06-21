
export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    setToken(state, newToken) {
      state.token = newToken
    }
  },
  actions: {}
}
