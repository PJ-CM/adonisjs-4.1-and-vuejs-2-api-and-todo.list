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
      <v-btn>
        <v-icon>ondemand_video</v-icon>
        Como se Hizo
      </v-btn>
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
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-x
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="indigo"
              dark
              v-bind="attrs"
              v-on="on"
              title="Menú de Usuario"
            >
              <v-icon>account_circle</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-avatar>
                  <img src="https://image.freepik.com/foto-gratis/joven-africana-ropa-verano-anillo-inflable_171337-14653.jpg" alt="John">
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Usuario AUTH</v-list-item-title>
                  <v-list-item-subtitle>{{ userEmail }}</v-list-item-subtitle>
                </v-list-item-content>

                <!-- <v-list-item-action>
                  <v-btn
                    :class="fav ? 'red--text' : ''"
                    icon
                    @click="fav = !fav"
                  >
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                </v-list-item-action> -->
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-btn class="green my-5" text dark @click="closeMenuAndLogout">
              <v-icon>exit_to_app</v-icon>
              Cerrar Sesión
            </v-btn>

            <!-- <v-divider></v-divider>

            <v-list>
              <v-list-item>
                <v-list-item-action>
                  <v-switch v-model="message" color="purple"></v-switch>
                </v-list-item-action>
                <v-list-item-title>Enable messages</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-action>
                  <v-switch v-model="hints" color="purple"></v-switch>
                </v-list-item-action>
                <v-list-item-title>Enable hints</v-list-item-title>
              </v-list-item>
            </v-list>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text @click="menu = false">Cancel</v-btn>
              <v-btn color="primary" text @click="menu = false">Save</v-btn>
            </v-card-actions> -->
          </v-card>
        </v-menu>
      </div>

    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
// import { mapGetters, mapMutations } from 'vuex'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    menu: false
    // menu: false,
    // fav: true,
    // menu: false,
    // message: false,
    // hints: true
  }),
  name: 'ToolBar',
  computed: {
    ...mapState('authentication', [
      'userEmail'
    ]),
    ...mapGetters('authentication', [
      'isLoggedIn'
    ])
  },
  methods: {
    ...mapActions('projects', [
      'resetProjectsPanel'
    ]),
    ...mapActions('tasks', [
      'resetTasksPanel'
    ]),
    // ...mapMutations('authentication', [
    //   'setToken'
    // ]),
    ...mapActions('authentication', [
      'logOut'
    ]),
    resetData () {
      this.menu = false
      this.resetProjectsPanel()
      this.resetTasksPanel()
    },
    closeMenuAndLogout () {
      this.resetData()
      this.logOut()
    }
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
