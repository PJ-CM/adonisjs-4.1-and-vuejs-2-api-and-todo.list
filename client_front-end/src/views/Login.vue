<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <h1>Inicio de Sesión</h1>

        <div class="mt-10">
          <v-text-field
            label="Email"
            placeholder="Especifica el Email del Registro"
            :value="loginEmail"
            @input="setLoginEmail"
            @keyup.enter="login"
          ></v-text-field>
            <!-- v-model="form.email" -->
          <v-text-field
            label="Contraseña"
            placeholder="Teclea tu Contraseña"
            type="password"
            :value="loginPassword"
            @input="setLoginPassword"
            @keyup.enter="login"
            autocomplete="false"
          ></v-text-field>
            <!-- v-model="form.password" -->
        </div>

        <v-alert class="alert-errors-gnral" type="error" :value="headerAuthError !== null">
          {{ headerAuthError }}
          <ul>
            <li v-for="(authError, index) in authErrors" :key="index">{{ authError.message }}</li>
            <!-- <li>{{ authErrors }}</li>
            <li>{{ authErrors.error }}</li> -->
          </ul>
        </v-alert>

        <div class="mt-10">
          <v-btn class="btn-action" dark @click="login">
            <v-icon>login</v-icon>
            Iniciar Sesión
          </v-btn>

          <v-btn class="ml-2" dark @click="resetLogin">
            <v-icon>settings_backup_restore</v-icon>
            Reset
          </v-btn>
        </div>
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
      'headerAuthError',
      'authErrors'
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
