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

        <v-alert type="error" :value="registerError">
          {{ registerError }}
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
      'registerError'
    ])
  },
  methods: {
    ...mapMutations('authentication', [
      'setRegisterEmail',
      'setRegisterPassword'
    ]),
    ...mapActions('authentication', [
      'register'
    ])
  }
}
</script>
