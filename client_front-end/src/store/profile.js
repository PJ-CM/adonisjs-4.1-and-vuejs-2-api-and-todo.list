import HTTP from '../http'

export default {
  namespaced: true,
  state: {
    dataEditingMode: false,
    passwordEditingMode: false,
    profilePasswordConfirmation: null,
    headerUserError: null,
    userErrors: [],
    selectedProfileTo: null
  },
  actions: {
    resetUserErrors ({ commit }) {
      commit('setHeaderUserError', null)
      commit('setUserErrors', [])
    },
    resetChange ({ dispatch, commit }) {
      commit('toggleDataEditingMode')
      dispatch('resetUserErrors')
    },
    resetChangePassw ({ dispatch, commit }) {
      commit('setProfilePasswordConfirmation', null)
      commit('togglePasswordEditingMode')
      dispatch('resetUserErrors')
    },
    applyChange ({ dispatch, commit }, user) {
      dispatch('resetUserErrors')
      return HTTP().patch(`users/update/${user.id}`, user)
        .then(() => {
          dispatch('resetChange')
        })
        .catch((error) => {
          commit('setHeaderUserError', 'Ocurrió cierto ERROR al querer modificar el usuario')
          commit('setUserErrors', error.response.data.error)
        })
    },
    applyChangePassw ({ dispatch, commit, state }, user) {
      dispatch('resetUserErrors')
      return HTTP().patch(`users/update-passw/${user.id}`, {
        password: user.password,
        password_confirmation: state.profilePasswordConfirmation
      })
        .then(() => {
          dispatch('resetChangePassw')
        })
        .catch((error) => {
          commit('setHeaderUserError', 'Ocurrió cierto ERROR al querer modificar la CONTRASEÑA del usuario')
          commit('setUserErrors', error.response.data.error)
        })
    },
    fetchUserAuth ({ commit }) {
      return HTTP().get('/users/auth')
        .then(({ data }) => {
          commit('authentication/setUser', data, { root: true })
        })
        .catch((error) => {
          commit('setHeaderUserError', 'Ocurrió cierto ERROR al querer recuperar los datos del usuario autenticado')
          commit('setUserErrors', error.response.data.error)
        })
    },
    deleteProfile ({ dispatch, commit }, user) {
      dispatch('resetUserErrors')
      return HTTP().delete(`users/delete/${user.id}`)
        .then(() => {
          commit('setSelectedProfileTo', null)

          dispatch('authentication/logOut', null, { root: true })
        })
        .catch((error) => {
          commit('setHeaderUserError', 'Ocurrió cierto ERROR al querer eliminar la cuenta del usuario')
          commit('setUserErrors', error.response.data.error)
        })
    },
    deleteProfileProjects ({ dispatch, commit }, user) {
      return HTTP().delete('/users/projects/delete')
        // .then(() => {
        //   dispatch('deleteProfile', user)
        // })
        .catch(() => {
          commit('setHeaderUserError', 'Ocurrió cierto ERROR al querer eliminar la lista de proyectos del usuario a eliminar')
        })
    },
    // => ASÍ NO
    // deleteProfileProjectsTasks ({ dispatch, commit }, user, projects) {
    // => ASÍ SI
    // deleteProfileProjectsTasks ({ dispatch, commit }, projects) {
    // => TODA LISTA DE PARÁMETROS que exceda de un total de 1, deberá ser recibida a modo de OBJETO de parámetros
    deleteProfileProjectsTasks ({ dispatch, commit }, { user, projects }) {
      // console.log('USER:', user)
      // console.log('PROYECTOS:', projects)
      Array.from(projects).forEach((project) => {
        // console.log('project.id', project.id)
        // console.log('project.id', project.name)
        // Por cada [ID], se TENDRÁ QUE LLAMAR a "projects/deleteProjectTasks"
        // y, tras ello, llamar al "deleteProfileProjects"
        // ---------------------------------------------------------------------------
        dispatch('projects/deleteProjectTasks', { project, haveToDelete: false }, { root: true })

        // OK
        dispatch('projects/deleteProject', { project }, { root: true })
      })

      // -> Como parece ser que, al llamar a "projects/deleteProjectTasks" desde aquí no llega a aplicarse
      // el correspondiente y deseado "projects/deleteProject", se hace necesario aplicar el borrado
      // de proyectos del usuario antes del borrado del propio usuario
      // // dispatch('deleteProfileProjects', user)
      // -> De esta forma, tampoco funciona de la manera deseada; los proyectos son eliminados pero quedan las
      // tareas relacionadas con esos proyectos eliminados
      // Debe ser la ejecución asíncrona de las acciones, es decir, que su ejecución no llegue a ser secuencial
      // y, por ello, en este último caso, se ejecute antes la eliminación del proyecto que la eliminación de
      // sus tareas, lo que hace imposible la eliminación de las mismas por la falta del prámetro "project" para
      // su eliminación

      // OK
      dispatch('deleteProfile', user)

      // Se pasa todo el proceso secuencial desde el propio método que lo arranca, osea, desde la vista de "Profile".
    },
    linkProfileProjectsTasks ({ dispatch, commit }, user) {
      dispatch('resetUserErrors')
      return HTTP().patch('users/projects/change-owner')
        .then(() => {
          dispatch('deleteProfile', user)
        })
        .catch((error) => {
          commit('setHeaderUserError', 'Ocurrió cierto ERROR al querer modificar la autoría del conjunto de proyectos del usuario a eliminar')
          commit('setUserErrors', error.response.data.error)
        })
    }
  },
  getters: {
  },
  mutations: {
    // setDataEditingMode (state, dataEditingMode) {
    //   state.dataEditingMode = dataEditingMode
    // },
    // setPasswordEditingMode (state, passwordEditingMode) {
    //   state.passwordEditingMode = passwordEditingMode
    // }
    toggleDataEditingMode (state) {
      state.dataEditingMode = !state.dataEditingMode
    },
    togglePasswordEditingMode (state) {
      state.passwordEditingMode = !state.passwordEditingMode
    },
    setHeaderUserError (state, headerUserError) {
      state.headerUserError = headerUserError
    },
    setUserErrors (state, userErrors) {
      state.userErrors = userErrors
    },
    setProfileUsername (state, { user, username }) {
      user.username = username
    },
    setProfileEmail (state, { user, email }) {
      user.email = email
    },
    setProfilePassword (state, { user, password }) {
      user.password = password
    },
    setProfilePasswordConfirmation (state, passwordConfirmation) {
      state.profilePasswordConfirmation = passwordConfirmation
    },
    setSelectedProfileTo (state, user) {
      state.selectedProfileTo = user
    }
  }
}
