// import router from '../router'
import HTTP from '../http'

export default {
  namespaced: true,
  state: {
    projects: [],
    newProjectName: null,
    newProjectError: null
  },
  actions: {
    create ({ commit, state }) {
      commit('setNewProjectError', null)
      return HTTP().post('/projects/store', {
        name: state.newProjectName
      })
        .then(({ data }) => {
          commit('appendProject', data)
          commit('setNewProjectName', null)
        })
        .catch(() => {
          commit('setNewProjectError', 'Ocurrió cierto ERROR al querer crear el nuevo proyecto')
        })
    }
  },
  getters: {
  },
  mutations: {
    setNewProjectError (state, error) {
      state.newProjectError = error
    },
    setNewProjectName (state, name) {
      state.newProjectName = name
    },
    appendProject (state, project) {
      state.projects.push(project)
    }
  }
}
