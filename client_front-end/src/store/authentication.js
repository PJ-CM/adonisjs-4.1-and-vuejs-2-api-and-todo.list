import router from '../router'
import HTTP from '../http'

export default {
  namespaced: true,
  state: {
    headerAuthError: null,
    authErrors: [],
    token: null,
    user: null,
    registerEmail: null,
    registerPassword: null,
    registerPasswordConfirmation: null,
    loginEmail: null,
    loginPassword: null
  },
  actions: {
    resetAuthErrors ({ commit }) {
      commit('setHeaderAuthError', null)
      commit('setAuthErrors', [])
    },
    resetRegister ({ dispatch, commit }) {
      commit('setRegisterEmail', null)
      commit('setRegisterPassword', null)
      commit('setRegisterPasswordConfirmation', null)
      dispatch('resetAuthErrors')
    },
    resetLogin ({ dispatch, commit }) {
      commit('setLoginEmail', null)
      commit('setLoginPassword', null)
      dispatch('resetAuthErrors')
    },
    register ({ dispatch, commit, state }) {
      // Resetear aquí, tanto los datos del formularios como los errores,
      // produce que los datos de formulario no lleguen al servidor.
      // dispatch('resetRegister')
      dispatch('resetAuthErrors')
      return HTTP().post('/users/register', {
        email: state.registerEmail,
        password: state.registerPassword,
        password_confirmation: state.registerPasswordConfirmation
      })
        .then(({ data }) => {
          // commit('setToken', data.token)
          // dispatch('fetchUserAuth', {
          //   redirectTo: '/projects'
          // })
          dispatch('resetRegister')
          commit('setToken', data.token.token)
          commit('setUser', data.user)
          router.push('/projects')
        })
        .catch((error) => {
          commit('setHeaderAuthError', 'Ocurrió cierto ERROR al querer iniciar sesión de usuario:')
          commit('setAuthErrors', error.response.data.error)
        })
    },
    login ({ dispatch, commit, state }) {
      // Resetear aquí, tanto los datos del formularios como los errores,
      // produce que los datos de formulario no lleguen al servidor.
      // dispatch('resetLogin')
      dispatch('resetAuthErrors')
      return HTTP().post('/users/login', {
        email: state.loginEmail,
        password: state.loginPassword
      })
        .then(({ data }) => {
          // console.log(data)

          // commit('setToken', data.token)
          // dispatch('fetchUserAuth', {
          //   redirectTo: '/projects'
          // })
          dispatch('resetLogin')
          commit('setToken', data.token.token)
          commit('setUser', data.user)
          router.push('/projects')
        })
        // .catch(() => {
        //   commit('setLoginError', 'Ocurrió cierto ERROR al querer iniciar sesión de usuario')
        // })
        .catch((error) => {
          // console.log('ERROR:', error)
          // console.log('ERROR-...-error:', error.response.data.error)
          commit('setHeaderAuthError', 'Ocurrió cierto ERROR al querer iniciar sesión de usuario:')
          commit('setAuthErrors', error.response.data.error)
        })
    },
    logOut ({ commit }) {
      commit('setToken', null)
      commit('setUser', null)
      router.push('/login')
    }// ,
    // fetchUserAuth ({ commit }, payload) {
    //   return HTTP().get('/users/auth')
    //     .then(({ data }) => {
    //       commit('setUser', data)
    //       router.push(payload.redirectTo)
    //     })
    //     .catch(() => {
    //       commit('setFetchUserAuthError', 'Ocurrió cierto ERROR al querer recuperar los datos del usuario autenticado')
    //     })
    // }
  },
  getters: {
    isLoggedIn (state) {
      return !!state.token
    }
  },
  mutations: {
    setFetchUserAuthError (state, error) {
      state.fetchUserAuthError = error
    },
    setHeaderAuthError (state, headerAuthError) {
      state.headerAuthError = headerAuthError
    },
    setAuthErrors (state, authErrors) {
      state.authErrors = authErrors
    },
    setToken (state, token) {
      state.token = token
    },
    setUser (state, user) {
      state.user = user
    },
    setRegisterEmail (state, email) {
      state.registerEmail = email
    },
    setRegisterPassword (state, password) {
      state.registerPassword = password
    },
    setRegisterPasswordConfirmation (state, passwordConfirmation) {
      state.registerPasswordConfirmation = passwordConfirmation
    },
    setLoginEmail (state, email) {
      state.loginEmail = email
    },
    setLoginPassword (state, password) {
      state.loginPassword = password
    }
  }
}
