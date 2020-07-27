import HTTP from '../http'

export default {
  namespaced: true,
  state: {
    registerEmail: null,
    registerPassword: null
  },
  actions: {
    register ({ state }) {
    // register ({ commit, state }) {
      return HTTP().post('/users/register', {
        email: state.registerEmail,
        password: state.registerPassword
      })
    }
  },
  mutations: {
    setRegisterEmail (state, email) {
      state.registerEmail = email
    },
    setRegisterPassword (state, password) {
      state.registerPassword = password
    }
  }
}
