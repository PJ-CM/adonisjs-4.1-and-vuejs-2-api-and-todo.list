<template>
  <v-container>
    <v-layout>
      <v-flex xs4>
        <Projects></Projects>
      </v-flex>
      <v-flex xs8 class="pl-4">
        <Panel title="Tareas">
          <h1>Contenido de Tareas del Proyecto Elegido</h1>
        </Panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Projects from '@/components/Projects.vue'
import router from '@/router'

export default {
  components: {
    Projects
  },
  computed: {
    ...mapGetters('authentication', [
      'isLoggedIn'
    ])
  },
  mounted () {
    if (!this.isLoggedIn) {
      return router.push('/login')
    }
  }
}
</script>
