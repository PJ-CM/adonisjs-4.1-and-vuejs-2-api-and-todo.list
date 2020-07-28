import router from '../router'
import HTTP from '../http'

export default {
  namespaced: true,
  state: {
    registerEmail: null,
    registerPassword: null,
    registerError: null,
    token: null,
    loginEmail: null,
    loginPassword: null,
    loginError: null
  },
  actions: {
    resetRegister ({ commit }) {
      commit('setRegisterEmail', null)
      commit('setRegisterPassword', null)
    },
    resetLogin ({ commit }) {
      commit('setLoginEmail', null)
      commit('setLoginPassword', null)
    },
    register ({ commit, state }) {
      commit('setRegisterError', null)
      return HTTP().post('/users/register', {
        email: state.registerEmail,
        password: state.registerPassword
      })
        .then(({ data }) => {
          commit('setToken', data.token)
          commit('setRegisterEmail', null)
          commit('setRegisterPassword', null)
          router.push('/')
        })
        .catch(() => {
          commit('setRegisterError', 'Ocurrió cierto ERROR al querer registrar la nueva cuenta de usuario')
        })
    },
    login ({ commit, state }) {
      commit('setLoginError', null)
      // commit('setLoginError', null)
      return HTTP().post('/users/login', {
        email: state.loginEmail,
        password: state.loginPassword
      })
        .then(({ data }) => {
          commit('setToken', data.token)
          commit('setLoginEmail', null)
          commit('setLoginPassword', null)
          router.push('/')
        })
        .catch(() => {
          commit('setLoginError', 'Ocurrió cierto ERROR al querer iniciar sesión de usuario')
        })
    },
    logOut ({ commit }) {
      commit('setToken', null)
      router.push('/login')
    }
  },
  getters: {
    isLoggedIn (state) {
      return !!state.token
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setRegisterError (state, error) {
      state.registerError = error
    },
    setRegisterEmail (state, email) {
      state.registerEmail = email
    },
    setRegisterPassword (state, password) {
      state.registerPassword = password
    },
    setLoginError (state, error) {
      state.loginError = error
    },
    setLoginEmail (state, email) {
      state.loginEmail = email
    },
    setLoginPassword (state, password) {
      state.loginPassword = password
    }
  }
}
