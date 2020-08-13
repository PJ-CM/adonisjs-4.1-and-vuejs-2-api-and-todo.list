import Vue from 'vue'

import HTTP from '../http'

export default {
  namespaced: true,
  state: {
    tasks: [],
    tasksAuth: [],
    newTaskName: null,
    headerTaskError: null,
    taskErrors: [],
    currentTaskEditing: null,
    fetchTasksError: null,
    tasksPanelTitle: null,
    disableTaskCreatingMode: true,
    selectedTaskTo: null
  },
  actions: {
    resetTaskErrors ({ commit }) {
      commit('setHeaderTaskError', null)
      commit('setTaskErrors', [])
    },
    resetTasksPanel ({ commit }) {
      commit('setTasks', [])
      commit('setTasksAuth', [])
      commit('setTasksPanelTitle', 'Tareas')
      commit('setDisableTaskCreatingMode', true)
    },
    setTasksPanel ({ commit }, payload) {
      commit('setTasksPanelTitle', `Tareas ... relativas a ... ${payload.projectName}`)
      commit('setTasks', payload.data)
    },
    fetchProjectTasks ({ dispatch, commit }, project) {
      return HTTP().get(`/projects/${project.id}/tasks`)
        .then(({ data }) => {
          dispatch('setTasksPanel', {
            projectName: project.name,
            data: data
          })
        })
        .catch(() => {
          commit('setFetchTasksError', 'Ocurrió cierto ERROR al querer recuperar la lista de tareas del proyecto elegido')
          dispatch('resetTasksPanel')
        })
    },
    fetchUserTasks ({ commit }) {
      return HTTP().get('/tasks/list-auth')
        .then(({ data }) => {
          commit('setTasksAuth', data)
        })
        .catch((error) => {
          commit('setHeaderTaskError', 'Ocurrió cierto ERROR al querer recuperar la lista de tareas del usuario autenticado')
          commit('setTaskErrors', error.response.data.error)
        })
    },
    createTask ({ dispatch, commit, state, rootState }) {
      dispatch('resetTaskErrors')
      // return HTTP().post(`/projects/${project.id}/tasks/store`, {
      return HTTP().post(`/projects/${rootState.projects.currentProject.id}/tasks/store`, {
        description: state.newTaskName
      })
        .then(({ data }) => {
          commit('appendTask', data)
          commit('setNewTaskName', null)
          dispatch('fetchUserTasks')
        })
        .catch((error) => {
          commit('setHeaderTaskError', 'Ocurrió cierto ERROR al querer crear la nueva tarea')
          commit('setTaskErrors', error.response.data.error)
        })
    },
    applyChange ({ dispatch, commit }, task) {
      dispatch('resetTaskErrors')
      return HTTP().patch(`tasks/update/${task.id}`, task)
        .then(() => {
          commit('unsetEditingMode', task)
        })
        .catch((error) => {
          commit('setHeaderTaskError', 'Ocurrió cierto ERROR al querer modificar la tarea')
          commit('setTaskErrors', error.response.data.error)
        })
    },
    deleteTask ({ dispatch, commit }, task) {
      return HTTP().delete(`tasks/delete/${task.id}`)
        .then(() => {
          commit('removeTaskFromList', task)
          commit('setSelectedTaskTo', null)
          dispatch('fetchUserTasks')
        })
    }
  },
  getters: {
  },
  mutations: {
    setHeaderTaskError (state, headerTaskError) {
      state.headerTaskError = headerTaskError
    },
    setTaskErrors (state, taskErrors) {
      state.taskErrors = taskErrors
    },
    setFetchTasksError (state, error) {
      state.fetchTasksError = error
    },
    setNewTaskName (state, name) {
      state.newTaskName = name
    },
    setCurrentTaskEditing (state, task) {
      state.currentTaskEditing = task
    },
    appendTask (state, task) {
      state.tasks.push(task)
    },
    setTasksPanelTitle (state, title) {
      state.tasksPanelTitle = title
    },
    setTasks (state, tasks) {
      state.tasks = tasks
    },
    setTasksAuth (state, tasksAuth) {
      state.tasksAuth = tasksAuth
    },
    setTaskDescription (state, { task, description }) {
      task.description = description
    },
    setDisableTaskCreatingMode (state, onOff) {
      state.disableTaskCreatingMode = onOff
    },
    setEditingMode (state, task) {
      // Esto no llega a estar permitido parece ser, debido a que no es un campo del registro
      // task.inEditingMode = true
      Vue.set(task, 'inEditingMode', true)

      state.currentTaskEditing = task
      state.tasks.forEach(tsk => {
        Vue.set(tsk, 'editingModeDisabled', (state.currentTaskEditing !== tsk))
      })
    },
    unsetEditingMode (state, task) {
      // Esto no llega a estar permitido parece ser, debido a que no es un campo del registro
      // task.inEditingMode = false
      Vue.set(task, 'inEditingMode', false)

      state.currentTaskEditing = null
      state.tasks.forEach(tsk => {
        Vue.set(tsk, 'editingModeDisabled', false)
      })
    },
    removeTaskFromList (state, task) {
      state.tasks.splice(state.tasks.indexOf(task), 1)
    },
    toggleCompleted (state, task) {
      task.completed = !task.completed
    },
    setSelectedTaskTo (state, task) {
      state.selectedTaskTo = task
    }
  }
}
