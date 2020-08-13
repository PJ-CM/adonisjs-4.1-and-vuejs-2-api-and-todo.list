<template>
  <Panel :title="tasksPanelTitle">
    <CreateRegister
      :disableRegisterCreatingMode="disableTaskCreatingMode"
      placeholder="Nombre de la nueva tarea..."
      :value="newTaskName"
      @on-input="setNewTaskName"
      @create="createTask"
    />

    <v-alert class="alert-errors-gnral" type="error" :value="headerTaskError !== null">
      {{ headerTaskError }}
      <ul>
        <li v-for="(taskError, index) in taskErrors" :key="index">{{ taskError.message }}</li>
      </ul>
    </v-alert>

    <div
      class="mx-1"
      v-if="tasks.length == 0">
      :: Ninguna tarea a listar por el momento ::
    </div>
    <div
      class="task mx-2 mt-2 mb-2"
      v-for="task in tasks" :key="task.id">
      <EditRegister
        :currentIdRegisterClicked="null"
        :inEditingMode="task.inEditingMode"
        :editingModeDisabled="task.editingModeDisabled"
        :name="task.description"
        :isCompletedCssTxt="task.completed"
        :isCompletedBtnDel="task.completed"
        @on-input="setTaskDescription({
          task,
          description: $event
        })"
        @on-edit="setEditingMode(task)"
        @on-save="applyChange(task)"
        @on-delete="confirmActionOnRegister(task)"
      >
        <v-icon
          @click="checkboxClicked(task)">
          {{ task.completed ? 'check_box' : 'check_box_outline_blank' }}
        </v-icon>
      </EditRegister>
    </div>
  </Panel>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import CreateRegister from '@/components/CreateRegister.vue'
import EditRegister from '@/components/EditRegister.vue'

export default {
  name: 'TasksPanel',
  // data () {
  //   return {
  //     title: ''
  //   }
  // },
  components: {
    CreateRegister,
    EditRegister
  },
  mounted () {
    // this.fetchProjectTasks()
    // Para que no lance la consulta sin un ID de proyecto elegido...
    if (this.currentProject) {
      this.fetchProjectTasks(this.currentProject)
    } else {
      this.setTasksPanelTitle('Tareas')
    }
  },
  computed: {
    ...mapState('tasks', [
      'disableTaskCreatingMode',
      'newTaskName',
      'headerTaskError',
      'taskErrors',
      'tasksPanelTitle',
      'tasks'
    ]),
    ...mapState('projects', [
      'currentProject'
    ])
  },
  methods: {
    // setTitle () {
    //   if (this.currentProject) {
    //     this.title = 'Tareas del Proyecto'
    //   } else {
    //     this.title = 'Tareas'
    //   }
    // },
    ...mapMutations('tasks', [
      'setNewTaskName',
      'setTaskDescription',
      'setEditingMode',
      'setTasksPanelTitle',
      'toggleCompleted',
      'setSelectedTaskTo'
    ]),
    ...mapMutations('modalConfirm', [
      'setModalTitle',
      'setModalText',
      'setModalPrimBtnTxt',
      'setModalPrimEvent',
      'setModalItemType'
    ]),
    ...mapActions('tasks', [
      'createTask',
      'fetchProjectTasks',
      'applyChange'
    ]),
    checkboxClicked (task) {
      this.toggleCompleted(task)
      this.applyChange(task)
    },
    confirmActionOnRegister (task) {
      this.setSelectedTaskTo(task)
      this.setModalTitle('Confirmar Acción - Tasks')
      this.setModalText('¿Está seguro de eliminar este Registro de TAREA?')
      this.setModalPrimBtnTxt('Eliminar')
      this.setModalPrimEvent('on-full-delete-confirmed')
      this.setModalItemType('task')
      this.$emit('on-show-modal-confirm')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.task {
  font-size: 1rem;
}
</style>
