<template>
  <v-toolbar dark dense>
    <!-- Lo que sigue era el icono de Hamburguesa :: aunque salía con fallo, al incluir un $ -->
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

    <img alt="Vue logo" src="@/assets/images/logo_adonisjs_vuejs.png" width="7%">
    <v-toolbar-title>ToDo</v-toolbar-title>
    <v-toolbar-items>
      <v-btn to="/">
        <v-icon>home</v-icon>
        Home
      </v-btn>
      <v-btn to="/projects" v-if="isLoggedIn">
        <v-icon>playlist_add_check</v-icon>
        Proyectos
      </v-btn>
      <v-btn to="/about">
        <v-icon>ondemand_video</v-icon>
        Como se Hizo
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
      <!-- <v-btn v-if="isLoggedIn" @click="logOut">
        <v-icon>exit_to_app</v-icon>
        Cerrar Sesión
      </v-btn> -->

      <div v-if="isLoggedIn" class="text-center">
        <UserMenu />
      </div>

    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
// import { mapGetters, mapMutations } from 'vuex'
import { mapGetters } from 'vuex'
import UserMenu from '@/components/UserMenu.vue'

export default {
  name: 'ToolBar',
  components: {
    UserMenu
  },
  computed: {
    ...mapGetters('authentication', [
      'isLoggedIn'
    ])
  },
  methods: {
    // ...mapMutations('authentication', [
    //   'setToken'
    // ]),
    // ...mapActions('authentication', [
    //   'logOut'
    // ]),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.v-toolbar {
  // background-color: cadetblue !important;
  background-color: var(--color-prim) !important;
  position: fixed;
  width: 100%;
  z-index: 999;

  .v-toolbar__title {
    margin-right: 1rem;
  }

  .v-btn {
    background-color: var(--color-prim) !important;
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
