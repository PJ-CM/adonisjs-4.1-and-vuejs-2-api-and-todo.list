<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <h1>Inicio de Sesión</h1>

        <v-text-field
          label="Email"
          placeholder="Email"
          :value="loginEmail"
          @input="setLoginEmail"
        ></v-text-field>
          <!-- v-model="form.email" -->
        <v-text-field
          label="Password"
          placeholder="Password"
          type="password"
          :value="loginPassword"
          @input="setLoginPassword"
          autocomplete="false"
        ></v-text-field>
          <!-- v-model="form.password" -->

        <v-alert type="error" :value="loginError">
          {{ loginError }}
        </v-alert>

        <v-btn color="green" dark @click="login">
          <v-icon>login</v-icon>
          Iniciar Sesión
        </v-btn>

        <v-btn class="ml-2" color="green" dark @click="resetLogin">
          <v-icon>settings_backup_restore</v-icon>
          Reset
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  // data () {
  //   return {
  //     form: {
  //       name: '',
  //       password: ''
  //     }
  //   }
  // },
  computed: {
    ...mapState('authentication', [
      'loginEmail',
      'loginPassword',
      'loginError'
    ])
  },
  methods: {
    ...mapMutations('authentication', [
      'setLoginEmail',
      'setLoginPassword'
    ]),
    ...mapActions('authentication', [
      'resetLogin',
      'login'
    ])
  }
}
</script>
