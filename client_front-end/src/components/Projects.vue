<template>
  <Panel title="Proyectos">
    <v-layout row wrap>
      <v-flex xs8>
        <v-text-field
          placeholder="Nombre del nuevo proyecto..."
          :value="newProjectName"
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
      v-for="project in projects" :key="project.id">
      {{ project.name }}
    </div>
  </Panel>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Projects',
  computed: {
    ...mapState('projects', [
      'newProjectName',
      'newProjectError',
      'projects'
    ])
  },
  methods: {
    ...mapMutations('projects', [
      'setNewProjectName'
    ]),
    ...mapActions('projects', [
      'create'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
