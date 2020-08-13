<template>
  <Panel title="Proyectos">
    <CreateRegister
      :disableRegisterCreatingMode="false"
      placeholder="Nombre del nuevo proyecto..."
      :value="newProjectName"
      @on-input="setNewProjectName"
      @create="createProject"
    />

    <v-alert class="alert-errors-section" type="error" :value="headerProjectError !== null">
      {{ headerProjectError }}
      <ul>
        <li v-for="(projectError, index) in projectErrors" :key="index">{{ projectError.message }}</li>
      </ul>
    </v-alert>

    <div
      class="mx-1"
      v-if="projects.length == 0">
      :: Ningún proyecto creado por el momento ::
    </div>
    <div
      class="project mx-2 mt-2 mb-2"
      v-for="project in projects" :key="project.id">
      <EditRegister
        :classRegisterHover="classRegisterHover"
        :currentIdRegisterClicked="currentIdProjectSelected"
        :inEditingMode="project.inEditingMode"
        :editingModeDisabled="project.editingModeDisabled"
        :idRegister="project.id"
        :name="project.name"
        :isCompletedCssTxt="false"
        :isCompletedBtnDel="true"
        @on-input="setProjectName({
          project,
          name: $event
        })"
        @on-click="projectClicked(project)"
        @on-edit="setEditingMode(project)"
        @on-save="applyChange(project)"
        @on-delete="confirmActionOnRegister(project)"
      />
    </div>
  </Panel>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import CreateRegister from '@/components/CreateRegister.vue'
import EditRegister from '@/components/EditRegister.vue'

export default {
  name: 'ProjectsPanel',
  components: {
    CreateRegister,
    EditRegister
  },
  mounted () {
    if (this.isLoggedIn) {
      this.fetch()
    }
  },
  computed: {
    ...mapGetters('authentication', [
      'isLoggedIn'
    ]),
    ...mapState('projects', [
      'newProjectName',
      'headerProjectError',
      'projectErrors',
      'projects',
      'currentProject',
      'currentIdProjectSelected',
      'classRegisterHover'
    ])//,
    // ...mapState('tasks', [
    //   'disableTaskCreatingMode'
    // ])
  },
  methods: {
    isProjectClicked (project) {
      return this.currentProject === project
    },
    projectClicked (project) {
      this.resetProjectErrors()
      this.resetTaskErrors()

      if (this.isProjectClicked(project)) {
        this.setCurrentProject(null)
        this.setCurrentIdProjectSelected(null)
        this.resetTasksPanel()
      } else {
        this.setCurrentProject(project)
        this.setCurrentIdProjectSelected(project.id)
        this.fetchProjectTasks(project)
        this.setDisableTaskCreatingMode(false)
      }
    },
    ...mapMutations('projects', [
      'setNewProjectName',
      'setProjectName',
      'setEditingMode',
      'setCurrentProject',
      'setCurrentIdProjectSelected',
      'setSelectedProjectTo'
    ]),
    ...mapMutations('tasks', [
      'setDisableTaskCreatingMode'
    ]),
    ...mapMutations('modalConfirm', [
      'setModalTitle',
      'setModalText',
      'setModalPrimBtnTxt',
      'setModalPrimEvent',
      'setModalItemType'
    ]),
    ...mapActions('projects', [
      'resetProjectErrors',
      'createProject',
      'fetch',
      'applyChange'
    ]),
    ...mapActions('tasks', [
      'resetTaskErrors',
      'fetchProjectTasks',
      'resetTasksPanel'
    ]),
    confirmActionOnRegister (project) {
      this.setSelectedProjectTo(project)
      this.setModalTitle('Confirmar Acción - Projects')
      this.setModalText('¿Está seguro de eliminar este Registro de PROYECTO y todas sus Tareas?')
      this.setModalPrimBtnTxt('Eliminar')
      this.setModalPrimEvent('on-full-delete-confirmed')
      this.setModalItemType('project')
      this.$emit('on-show-modal-confirm')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.project {
  font-size: 1rem;
}
</style>
