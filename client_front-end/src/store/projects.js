import Vue from 'vue'

import HTTP from '../http'

export default {
  namespaced: true,
  state: {
    projects: [],
    newProjectName: null,
    newProjectError: null,
    currentProject: null,
    currentIdProjectSelected: null,
    classRegisterHover: true,
    currentProjectEditing: null,
    fetchProjectsError: null,
    deleteProjectTasksError: null,
    selectedProjectTo: null
  },
  actions: {
    resetProjectsPanel ({ commit }) {
      commit('setCurrentProject', null)
      commit('setCurrentIdProjectSelected', null)
    },
    fetch ({ commit }) {
      return HTTP().get('/projects')
        .then(({ data }) => {
          commit('setProjects', data)
        })
        .catch(() => {
          commit('setFetchProjectsError', 'Ocurrió cierto ERROR al querer recuperar la lista de proyectos del usuario')
        })
    },
    createProject ({ commit, state }) {
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
    },
    applyChange ({ commit }, project) {
      return HTTP().patch(`projects/update/${project.id}`, project)
        .then(() => {
          commit('unsetEditingMode', project)
        })
    },
    deleteProject ({ dispatch, commit }, payload) {
      return HTTP().delete(`projects/delete/${payload.project.id}`)
        .then(() => {
          commit('removeProjectFromList', payload.project)
          dispatch('resetProjectsPanel')
          dispatch('tasks/resetTasksPanel', null, { root: true })
        })
    },
    deleteProjectTasks ({ dispatch, commit }, project) {
      return HTTP().delete(`/projects/${project.id}/tasks/delete`)
        .then(() => {
          dispatch('deleteProject', {
            project
          })
        })
        .catch(() => {
          commit('setDeleteProjectTasksError', 'Ocurrió cierto ERROR al querer eliminar la lista de tareas del proyecto elegido')
        })
    }
  },
  getters: {
  },
  mutations: {
    setNewProjectError (state, error) {
      state.newProjectError = error
    },
    setFetchProjectsError (state, error) {
      state.fetchProjectsError = error
    },
    setDeleteProjectTasksError (state, error) {
      state.deleteProjectTasksError = error
    },
    setNewProjectName (state, name) {
      state.newProjectName = name
    },
    setCurrentProject (state, project) {
      state.currentProject = project
    },
    setCurrentIdProjectSelected (state, id) {
      state.currentIdProjectSelected = id
    },
    setCurrentProjectEditing (state, project) {
      state.currentProjectEditing = project
    },
    appendProject (state, project) {
      state.projects.push(project)
    },
    setProjects (state, projects) {
      state.projects = projects
    },
    setProjectName (state, { project, name }) {
      project.name = name
    },
    setEditingMode (state, project) {
      // Esto no llega a estar permitido parece ser, debido a que no es un campo del registro
      // project.inEditingMode = true
      Vue.set(project, 'inEditingMode', true)
      state.currentProjectEditing = project
      // commit('setCurrentProjectEditing', project)

      // commit('setEditingDisabled')
      // },
      // setEditingDisabled ({ state }) {
      state.projects.forEach(proj => {
        Vue.set(proj, 'editingModeDisabled', (state.currentProjectEditing !== proj))
      })
    },
    unsetEditingMode (state, project) {
      // Esto no llega a estar permitido parece ser, debido a que no es un campo del registro
      // project.inEditingMode = false
      Vue.set(project, 'inEditingMode', false)
      state.currentProjectEditing = null
      // commit('setCurrentProjectEditing', null)

      // commit('unsetEditingDisabled')
      // },
      // unsetEditingDisabled ({ state }) {
      state.projects.forEach(proj => {
        Vue.set(proj, 'editingModeDisabled', false)
      })
    },
    removeProjectFromList (state, project) {
      state.projects.splice(state.projects.indexOf(project), 1)
    },
    setSelectedProjectTo (state, project) {
      state.selectedProjectTo = project
    }
  }
}
