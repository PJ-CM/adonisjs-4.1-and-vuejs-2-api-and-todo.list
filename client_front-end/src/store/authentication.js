import router from '../router'
import HTTP from '../http'

export default {
  namespaced: true,
  state: {
    token: null,
    user: null,
    registerEmail: null,
    registerPassword: null,
    registerError: null,
    loginEmail: null,
    loginPassword: null,
    loginError: null,
    fetchUserAuthError: null
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
    register ({ dispatch, commit, state }) {
      commit('setRegisterError', null)
      return HTTP().post('/users/register', {
        email: state.registerEmail,
        password: state.registerPassword
      })
        .then(({ data }) => {
          commit('setToken', data.token)
          commit('setRegisterEmail', null)
          commit('setRegisterPassword', null)
          dispatch('fetchUserAuth', {
            redirectTo: '/projects'
          })
        })
        .catch(() => {
          commit('setRegisterError', 'Ocurrió cierto ERROR al querer registrar la nueva cuenta de usuario')
        })
    },
    login ({ dispatch, commit, state }) {
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
          dispatch('fetchUserAuth', {
            redirectTo: '/projects'
          })
        })
        .catch(() => {
          commit('setLoginError', 'Ocurrió cierto ERROR al querer iniciar sesión de usuario')
        })
    },
    logOut ({ commit }) {
      commit('setToken', null)
      commit('setUser', null)
      router.push('/login')
    },
    fetchUserAuth ({ commit }, payload) {
      return HTTP().get('/users/auth')
        .then(({ data }) => {
          commit('setUser', data)
          router.push(payload.redirectTo)
        })
        .catch(() => {
          commit('setFetchUserAuthError', 'Ocurrió cierto ERROR al querer recuperar los datos del usuario autenticado')
        })
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
    setUser (state, user) {
      state.user = user
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
    },
    setFetchUserAuthError (state, error) {
      state.fetchUserAuthError = error
    }
  }
}
