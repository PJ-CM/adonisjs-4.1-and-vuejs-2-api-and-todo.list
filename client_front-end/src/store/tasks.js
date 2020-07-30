import Vue from 'vue'

// import router from '../router'
import HTTP from '../http'

export default {
  namespaced: true,
  state: {
    tasks: [],
    newTaskName: null,
    newTaskError: null,
    currentTaskEditing: null,
    fetchTasksError: null,
    tasksPanelTitle: null
  },
  actions: {
    fetchProjectTasks ({ commit }, project) {
      commit('setTasksPanelTitle', `Tareas ... relativas a ...${project.name}`)

      return HTTP().get(`/projects/${project.id}/tasks`)
        .then(({ data }) => {
          commit('setTasks', data)
        })
        .catch(() => {
          commit('setFetchTasksError', 'Ocurrió cierto ERROR al querer recuperar la lista de tareas del proyecto elegido')
        })
    },
    createTask ({ commit, state }, project) {
      commit('setNewTaskError', null)
      return HTTP().post(`/projects/${project.id}/tasks/store`, {
        description: state.newTaskName
      })
        .then(({ data }) => {
          commit('appendTask', data)
          commit('setNewTaskName', null)
        })
        .catch(() => {
          commit('setNewTaskError', 'Ocurrió cierto ERROR al querer crear la nueva tarea')
        })
    },
    applyChange ({ commit }, task) {
      return HTTP().patch(`tasks/update/${task.id}`, task)
        .then(() => {
          commit('unsetEditingMode', task)
        })
    },
    deleteRegister ({ commit }, task) {
      return HTTP().delete(`tasks/delete/${task.id}`)
        .then(() => {
          commit('removeTaskFromList', task)
        })
    }
  },
  getters: {
  },
  mutations: {
    setNewTaskError (state, error) {
      state.newTaskError = error
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
    setTaskName (state, { task, name }) {
      task.name = name
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
    }
  }
}
