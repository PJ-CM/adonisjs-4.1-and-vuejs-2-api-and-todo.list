<template>
  <Panel :title="tasksPanelTitle">
    <CreateRegister
      :disableRegisterCreatingMode="disableTaskCreatingMode"
      placeholder="Nombre de la nueva tarea..."
      :value="newTaskName"
      @onInput="setNewTaskName"
      @create="createTask"
    />

    <div
      class="mx-1"
      v-if="tasks.length == 0">
      :: Ninguna tarea creada por el momento ::
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
        @onInput="setTaskDescription({
          task,
          description: $event
        })"
        @onEdit="setEditingMode(task)"
        @onSave="applyChange(task)"
        @onDelete="confirmActionOnRegister(task)"
      >
        <v-icon
          @click="checkboxClicked(task)">
          {{ task.completed ? 'check_box' : 'check_box_outline_blank' }}
        </v-icon>
      </EditRegister>
    </div>

    <ModalConfirm
      :modalConfirmMode="modalConfirmMode"
      :modalTitle="modalTitle"
      :modalText="modalText"
      :modalBtnText="modalBtnText"
      @onDeleteConfirmed="deleteConfirmed()"
    />
  </Panel>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import CreateRegister from '@/components/CreateRegister.vue'
import EditRegister from '@/components/EditRegister.vue'
import ModalConfirm from '@/components/ModalConfirm.vue'

export default {
  name: 'Tasks',
  // data () {
  //   return {
  //     title: ''
  //   }
  // },
  components: {
    CreateRegister,
    EditRegister,
    ModalConfirm
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
      'newTaskError',
      'tasksPanelTitle',
      'tasks',
      'modalConfirmMode',
      'modalTitle',
      'modalText',
      'modalBtnText',
      'selectedTaskTo'
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
      'setSelectedTaskTo',
      'toggleModalConfirm',
      'setModalTitle',
      'setModalText',
      'setModalBtnText'
    ]),
    ...mapActions('tasks', [
      'createTask',
      'fetchProjectTasks',
      'applyChange',
      'deleteRegister'
    ]),
    checkboxClicked (task) {
      this.toggleCompleted(task)
      this.applyChange(task)
    },
    confirmActionOnRegister (task) {
      this.setSelectedTaskTo(task)
      this.setModalTitle('Confirmar Acción - Tasks')
      this.setModalText('¿Está seguro de eliminar este registro?')
      this.setModalBtnText('Eliminar')
      this.toggleModalConfirm(true)
    },
    deleteConfirmed () {
      this.toggleModalConfirm(false)
      this.deleteRegister(this.selectedTaskTo)
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
