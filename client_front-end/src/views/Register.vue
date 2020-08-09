<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <h1>Registro</h1>

        <v-text-field
          label="Email"
          placeholder="Indica tu Dirección de Correo"
          :value="registerEmail"
          @input="setRegisterEmail"
          @keyup.enter="register"
        ></v-text-field>
        <v-text-field
          label="Contraseña"
          placeholder="Teclea una Contraseña"
          type="password"
          :value="registerPassword"
          @input="setRegisterPassword"
          @keyup.enter="register"
          autocomplete="false"
        ></v-text-field>
        <v-text-field
          label="Comfirmar Contraseña"
          placeholder="Comfirmar la Contraseña Tecleada"
          type="password"
          :value="registerPasswordConfirmation"
          @input="setRegisterPasswordConfirmation"
          @keyup.enter="register"
          autocomplete="false"
        ></v-text-field>

        <v-alert class="alert-errors-gnral" type="error" :value="headerAuthError !== null">
          {{ headerAuthError }}
          <ul>
            <li v-for="(authError, index) in authErrors" :key="index">{{ authError.message }}</li>
          </ul>
        </v-alert>

        <v-btn class="btn-action" dark @click="register">
          <v-icon>account_box</v-icon>
          Registrarse
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('authentication', [
      'registerEmail',
      'registerPassword',
      'registerPasswordConfirmation',
      'headerAuthError',
      'authErrors'
    ])
  },
  methods: {
    ...mapMutations('authentication', [
      'setRegisterEmail',
      'setRegisterPassword',
      'setRegisterPasswordConfirmation'
    ]),
    ...mapActions('authentication', [
      'register'
    ])
  }
}
</script>
