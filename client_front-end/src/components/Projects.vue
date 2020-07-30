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
        :currentIdRegisterClicked="currentIdProjectSelected"
        :inEditingMode="project.inEditingMode"
        :editingModeDisabled="project.editingModeDisabled"
        :idRegister="project.id"
        :name="project.name"
        @onInput="setProjectName({
          project,
          name: $event
        })"
        @onClick="projectClicked(project)"
        @onEdit="setEditingMode(project)"
        @onSave="applyChange(project)"
        @onDelete="deleteRegister(project)"
      />
    </div>
  </Panel>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import CreateRegister from '@/components/CreateRegister.vue'
import EditRegister from '@/components/EditRegister.vue'

export default {
  name: 'Projects',
  components: {
    CreateRegister,
    EditRegister
  },
  mounted () {
    this.fetch()
  },
  computed: {
    ...mapState('projects', [
      'newProjectName',
      'newProjectError',
      'projects',
      'currentProject',
      'currentIdProjectSelected'
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
      'setCurrentIdProjectSelected'
    ]),
    ...mapMutations('tasks', [
      'setDisableTaskCreatingMode'
    ]),
    ...mapActions('projects', [
      'createProject',
      'fetch',
      'applyChange',
      'deleteRegister'
    ]),
    ...mapActions('tasks', [
      'fetchProjectTasks',
      'resetTasksPanel'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.project {
  font-size: 1rem;
}
</style>
