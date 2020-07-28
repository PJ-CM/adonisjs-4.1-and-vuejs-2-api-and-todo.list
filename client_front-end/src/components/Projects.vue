<template>
  <Panel title="Proyectos">
    <v-layout row wrap class="mx-1">
      <v-flex xs8>
        <v-text-field
          placeholder="Nombre del nuevo proyecto..."
          :value="newProjectName"
          @keyup.enter="create"
          @input="setNewProjectName"
        ></v-text-field>
      </v-flex>

      <v-alert type="error" :value="newProjectError">
        {{ newProjectError }}
      </v-alert>

      <v-flex xs4>
        <v-btn
          dark
          class="mt-3"
          color="green" @click="create">
          <v-icon class="mr-2">add_circle</v-icon>
          Crear
        </v-btn>
      </v-flex>
    </v-layout>

    <div
      class="mx-1"
      v-if="projects.length == 0">
      :: Ningún proyecto creado por el momento ::
    </div>
    <div
      class="project mx-2 mt-2 mb-2"
      v-for="project in projects" :key="project.id">
      <v-layout row wrap>
        <v-flex xs9 class="text-left">
          <span
            v-if="!project.inEditingMode">
            {{ project.name }}
          </span>
          <v-text-field
            autofocus
            v-if="project.inEditingMode"
            :value="project.name"
            @keyup.enter="applyChange(project)"
            @input="setProjectName({
              project,
              name: $event
            })"
          ></v-text-field>
        </v-flex>

        <v-flex xs3 class="text-right">
          <v-icon
            v-if="!project.inEditingMode"
            @click="setEditingMode(project)" title="Editar">edit</v-icon>
          <v-icon
            v-if="project.inEditingMode"
            @click="applyChange(project)" title="Validar">check</v-icon>
          <v-icon
            @click="deleteRegister(project)" title="Eliminar">delete</v-icon>
        </v-flex>
      </v-layout>
    </div>
  </Panel>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Projects',
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
      'create',
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
