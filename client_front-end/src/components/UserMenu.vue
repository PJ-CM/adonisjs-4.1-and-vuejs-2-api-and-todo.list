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

      <v-btn class="btn-action my-5" text dark @click="closeMenuAndLogout">
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
      'userEmail'
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

<style scope lang="scss">
.btn-usermenu {
  background-color: var(--color-prim) !important;
  box-shadow: none;
  height: 100% !important;
  border-radius: 0;
}
</style>
