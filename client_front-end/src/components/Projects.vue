<template>
  <Panel title="Proyectos">
    <CreateRegister
      :disableRegisterCreatingMode="false"
      placeholder="Nombre del nuevo proyecto..."
      :value="newProjectName"
      @onInput="setNewProjectName"
      @create="createProject"
    />

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
        @onInput="setProjectName({
          project,
          name: $event
        })"
        @onClick="projectClicked(project)"
        @onEdit="setEditingMode(project)"
        @onSave="applyChange(project)"
        @onDelete="confirmActionOnRegister(project)"
      />
    </div>
  </Panel>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import CreateRegister from '@/components/CreateRegister.vue'
import EditRegister from '@/components/EditRegister.vue'

export default {
  name: 'Projects',
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
      'newProjectError',
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
    isPprojectClicked (project) {
      return this.currentProject === project
    },
    projectClicked (project) {
      if (this.isPprojectClicked(project)) {
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
      'setModalBtnText',
      'setModalItemType'
    ]),
    ...mapActions('projects', [
      'createProject',
      'fetch',
      'applyChange'
    ]),
    ...mapActions('tasks', [
      'fetchProjectTasks',
      'resetTasksPanel'
    ]),
    confirmActionOnRegister (project) {
      this.setSelectedProjectTo(project)
      this.setModalTitle('Confirmar Acción - Projects')
      this.setModalText('¿Está seguro de eliminar este registro de PROJECT?')
      this.setModalBtnText('Eliminar')
      this.setModalItemType('project')
      this.$emit('onShowModalConfirm')
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
