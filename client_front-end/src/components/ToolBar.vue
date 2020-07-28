<template>
  <v-toolbar dark dense>
    <!-- Lo que sigue era el icono de Hamburguesa :: aunque salía con fallo, al incluir un $ -->
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

    <v-toolbar-title>VUE TODO</v-toolbar-title>
    <v-toolbar-items>
      <v-btn to="/">
        <v-icon>home</v-icon>
        Home
      </v-btn>
      <v-btn to="/projects" v-if="isLoggedIn">
        <v-icon>playlist_add_check</v-icon>
        Proyectos
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn to="/register" v-if="!isLoggedIn">
        <v-icon>account_box</v-icon>
        Registrarse
      </v-btn>
      <v-btn to="/login" v-if="!isLoggedIn">
        <v-icon>fingerprint</v-icon>
        Iniciar Sesión
      </v-btn>
      <!-- <v-btn v-if="isLoggedIn" @click="setToken(null)">
        <v-icon>exit_to_app</v-icon>
        Cerrar Sesión
      </v-btn> -->
      <v-btn v-if="isLoggedIn" @click="logOut">
        <v-icon>exit_to_app</v-icon>
        Cerrar Sesión
      </v-btn>
      <v-btn>
        <v-icon>ondemand_video</v-icon>
        Como se Hizo
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
// import { mapGetters, mapMutations } from 'vuex'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ToolBar',
  computed: {
    ...mapGetters('authentication', [
      'isLoggedIn'
    ])
  },
  methods: {
    // ...mapMutations('authentication', [
    //   'setToken'
    // ]),
    ...mapActions('authentication', [
      'logOut'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.v-toolbar {
  background-color: green !important;
  position: fixed;
  width: 100%;

  .v-toolbar__title {
    margin-right: 1rem;
  }

  .v-btn {
    background-color: green !important;
    box-shadow: none;
    height: 100% !important;
    border-radius: 0;

    // Pasó al STYLE de la App para ser más general...
    // .v-icon {
    //   margin-right: .11rem;
    // }
  }
}
</style>
