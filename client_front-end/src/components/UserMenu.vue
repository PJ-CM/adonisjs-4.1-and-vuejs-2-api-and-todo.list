<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="btn-usermenu"
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
            <v-list-item-title>
              <a @click="goToProfile" title="Acceder al Perfil de Usuario">Usuario AUTH</a>
            </v-list-item-title>
            <v-list-item-subtitle>@{{ user ? user.username : '' }}</v-list-item-subtitle>
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

      <v-btn class="btn-action my-5" text dark @click="applyFullLogout">
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
</template>

<script>
import { mapState, mapActions } from 'vuex'
import router from '@/router'

export default {
  name: 'UserMenu',

  data: () => ({
    menu: false
    // menu: false,
    // fav: true,
    // menu: false,
    // message: false,
    // hints: true
  }),

  // props: [
  //   'placeholder',
  //   'value',
  //   'disableRegisterCreatingMode'
  // ]
  computed: {
    ...mapState('authentication', [
      'user'
    ])
  },
  methods: {
    ...mapActions('projects', [
      'resetProjectsPanel'
    ]),
    ...mapActions('tasks', [
      'resetTasksPanel'
    ]),
    ...mapActions('authentication', [
      'logOut'
    ]),
    closeUserMenu () {
      this.menu = false
    },
    resetData () {
      this.resetProjectsPanel()
      this.resetTasksPanel()
    },
    applyFullLogout () {
      this.closeUserMenu()
      this.resetData()
      this.logOut()
    },
    goToProfile () {
      // this.closeUserMenu()
      // return router.push('/profile')
      // -------------------------------------------------------------------------------------------------------------------
      // Error presentado en CONSOLA si se intenta navegar al "/profile" estando ya en esa ruta:
      //    [Vue warn]: Error in v-on handler (Promise/async): "Error: Avoided redundant navigation to current location: "/profile"."
      // -> Para evitar eso, primero, se verifica que la ruta a la que ir no es la actual y, solamente, si es diferente,
      // se navegará hacia ella.
      // -------------------------------------------------------------------------------------------------------------------
      this.closeUserMenu()
      const path = '/profile'
      // if (this.$route.path !== path) this.$router.push(path)
      if (this.$route.path !== path) return router.push(path)
    }
  }
}
</script>

<style scope lang="scss">
.btn-usermenu {
  background-color: var(--color-prim) !important;
  box-shadow: none;
  height: 100% !important;
  border-radius: 0;
}
</style>
