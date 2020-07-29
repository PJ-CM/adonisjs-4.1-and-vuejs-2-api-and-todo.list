<template>
  <Panel title="Proyectos">
    <CreateRegister
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
        :inEditingMode="project.inEditingMode"
        :name="project.name"
        :theRegister="project"
        @onInput="setProjectName({
          project,
          name: $event
        })"
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
      'projects'
    ])
  },
  methods: {
    ...mapMutations('projects', [
      'setNewProjectName',
      'setProjectName',
      'setEditingMode'
    ]),
    ...mapActions('projects', [
      'createProject',
      'fetch',
      'applyChange',
      'deleteRegister'
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
