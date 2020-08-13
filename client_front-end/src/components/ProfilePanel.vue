<template>
  <Panel title="Perfil de Usuario">
    <h1>Aloha!!</h1>
    <v-layout class="mt-2 mb-4" v-if="user !== null">
      <v-flex xs4 class="px-4">
        <img src="https://image.freepik.com/foto-gratis/joven-africana-ropa-verano-anillo-inflable_171337-14653.jpg" alt="John" width="100%" class="rounded-circle">

        <div class="mt-2">
          <v-btn icon class="pl-1 btn-action" dark
            v-if="!dataEditingMode"
            @click="toggleDataEditingMode" title="Editar datos generales"
            :disabled="passwordEditingMode">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn icon class="pl-1 btn-action" dark
            v-else
            @click="applyChange(user)" title="Guardar cambios">
            <v-icon>check</v-icon>
          </v-btn>

          <v-btn icon class="pl-1 ml-2 orange" dark
            v-if="!passwordEditingMode"
            @click="togglePasswordEditingMode" title="Editar clave privada"
            :disabled="dataEditingMode">
            <v-icon>vpn_key</v-icon>
          </v-btn>
          <v-btn icon class="pl-1 ml-2 orange" dark
            v-else
            @click="applyChangePassw(user)" title="Guardar cambio de clave">
            <v-icon>done_all</v-icon>
          </v-btn>

          <v-btn icon class="pl-1 ml-2 red" dark
            @click="confirmActionOnRegister(user)" title="Eliminar definitivamente esta cuenta"
            :disabled="dataEditingMode || passwordEditingMode">
            <v-icon>delete_forever</v-icon>
          </v-btn>
        </div>
      </v-flex>

      <v-flex xs8 class="px-4" style="border-left: 1px solid green;">
        <v-alert class="alert-errors-section" type="error" :value="headerUserError !== null">
          {{ headerUserError }}
          <ul>
            <li v-for="(userError, index) in userErrors" :key="index">{{ userError.message }}</li>
          </ul>
        </v-alert>

        <div v-if="!dataEditingMode">
          <v-layout>
            <v-flex xs4 class="text-left font-weight-bold">
              <span>ID:</span>
            </v-flex>
            <v-flex xs8 class="pl-4">
              <div class="blue-grey lighten-2 text-center">
                <span class="white--text">{{ user.id }}</span>
              </div>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs4 class="text-left font-weight-bold">
              <span>Username:</span>
            </v-flex>
            <v-flex xs8 class="pl-4 mt-1">
              <div class="blue-grey lighten-2 text-center">
                <span class="white--text">{{ user.username }}</span>
              </div>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs4 class="text-left font-weight-bold">
              <span>Email:</span>
            </v-flex>
            <v-flex xs8 class="pl-4 mt-1">
              <div class="blue-grey lighten-2 text-center">
                <span class="white--text">{{ user.email }}</span>
              </div>
            </v-flex>
          </v-layout>
        </div>
        <div v-else>
          <v-layout>
            <v-flex xs4 class="text-left font-weight-bold">
              <span>ID:</span>
            </v-flex>
            <v-flex xs8 class="pl-4">
              <div class="blue-grey lighten-2 text-center">
                <span class="white--text">{{ user.id }}</span>
              </div>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs4 class="text-left font-weight-bold">
              <span>Username:</span>
            </v-flex>
            <v-flex xs8 class="pl-4 mt-1">
              <div class="blue-grey lighten-2 text-center">
                <v-text-field color="white" dark
                  autofocus
                  placeholder="Renueva tu Username"
                  :value="user.username"
                  @keyup.esc="cancelChange"
                  @keyup.enter="applyChange(user)"
                  @input="setProfileUsername({
                    user,
                    username: $event
                  })"
                ></v-text-field>
              </div>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs4 class="text-left font-weight-bold">
              <span>Email:</span>
            </v-flex>
            <v-flex xs8 class="pl-4 mt-1">
              <div class="blue-grey lighten-2 text-center">
                <v-text-field color="white" dark
                  placeholder="Renueva tu Email"
                  :value="user.email"
                  @keyup.esc="cancelChange"
                  @keyup.enter="applyChange(user)"
                  @input="setProfileEmail({
                    user,
                    email: $event
                  })"
                ></v-text-field>
              </div>
            </v-flex>
          </v-layout>
        </div>

        <v-divider v-if="dataEditingMode || passwordEditingMode" class="my-3 green"></v-divider>

        <div v-if="dataEditingMode || passwordEditingMode">
          <v-layout>
            <v-flex xs12 class="text-center caption">
              <span>Con el cursor dentro de uno de los campos:<br><strong>ENTER</strong> para Aceptar, <strong>ESC</strong> para Cancelar.</span>
            </v-flex>
          </v-layout>
        </div>

        <v-divider v-if="passwordEditingMode" class="my-3 green"></v-divider>

        <div v-if="passwordEditingMode">
          <v-layout>
            <v-flex xs4 class="text-left font-weight-bold">
              <span>Contraseña:</span>
            </v-flex>
            <v-flex xs8 class="pl-4">
              <div class="blue-grey lighten-2 text-center">
                <v-text-field color="white" dark
                  autofocus
                  placeholder="Renueva tu Contraseña"
                  type="password"
                  @keyup.esc="cancelChangePassw"
                  @keyup.enter="applyChangePassw(user)"
                  @input="setProfilePassword({
                    user,
                    password: $event
                  })"
                  autocomplete="false"
                ></v-text-field>
              </div>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs4 class="text-left font-weight-bold">
              <span>Confirmar:</span>
            </v-flex>
            <v-flex xs8 class="pl-4">
              <div class="blue-grey lighten-2 text-center">
                <v-text-field color="white" dark
                  placeholder="Confirmar tu Contraseña"
                  type="password"
                  @keyup.esc="cancelChangePassw"
                  @keyup.enter="applyChangePassw(user)"
                  :value="profilePasswordConfirmation"
                  @input="setProfilePasswordConfirmation"
                  autocomplete="false"
                ></v-text-field>
              </div>
            </v-flex>
          </v-layout>
        </div>

        <v-divider class="my-3 green"></v-divider>

        <v-layout>
          <v-flex xs6 class="text-center">
            <span>Proyectos (<strong>{{ projects.length }}</strong>)</span>
          </v-flex>

          <v-divider vertical color="green"></v-divider>

          <v-flex xs6 class="text-center">
            <span>Tareas (<strong>{{ tasksAuth.length }}</strong>)</span>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </Panel>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'ProfilePanel',

  props: [
    'user',
    'projects',
    'tasksAuth'
  ],

  computed: {
    ...mapState('profile', [
      'dataEditingMode',
      'passwordEditingMode',
      'profilePasswordConfirmation',
      'headerUserError',
      'userErrors'
    ])
  },
  methods: {
    ...mapMutations('profile', [
      'toggleDataEditingMode',
      'togglePasswordEditingMode',
      'setProfileUsername',
      'setProfileEmail',
      'setProfilePassword',
      'setProfilePasswordConfirmation',
      'setSelectedProfileTo'
    ]),
    ...mapMutations('modalConfirm', [
      'setModalMaxWidth',
      'modalTitleBgClass',
      'setModalTitle',
      'setModalText',
      'setModalPrimBtnTxt',
      'setModalSecBtnTxt',
      'setModalPrimEvent',
      'setModalSecEvent',
      'setModalItemType'
    ]),
    ...mapActions('profile', [
      'resetChange',
      'resetChangePassw',
      'applyChange',
      'applyChangePassw',
      'fetchUserAuth'
    ]),
    cancelChange () {
      this.resetChange()
      this.fetchUserAuth()
    },
    cancelChangePassw () {
      this.resetChangePassw()
      this.fetchUserAuth()
    },
    confirmActionOnRegister (user) {
      this.setSelectedProfileTo(user)
      this.setModalTitle('Confirmar Acción - Perfil')
      this.setModalText('¿Está seguro de eliminar este Perfil de USUARIO y desvincularse de todos sus Proyectos y Tareas?')
      this.setModalPrimBtnTxt('Eliminar')
      this.setModalPrimEvent('on-delete-confirmed')
      this.setModalItemType('user')
      this.$emit('on-show-modal-confirm')
    }
  }
}
</script>

<style scoped lang="scss">
.colorWhite {
  color: white;
}

.v-text-field {
  padding: 2px 5px;
  margin: 1px auto 0;
  height: 42px;
  // text-align: center;
}

// Queriendo poner el texto del INPUT de un determinado color y alinearlo pero resulta IMPOSIBLE

// .theme--dark.v-input, .theme--dark.v-input input,
// .v-text-field input, input {
//   color: red!important;
//   text-align: right!important;
// }

// .v-text-field {
//   & > input {
//     color: white;
//   }
// }

// .v-input { text-align: center; }

// .v-text-field .v-input__control .v-input__slot .v-text-field__slot input {
//   color: white;
//   /* margin: 0; */
//   padding: 0;
//   text-align: center !important;
// }

// .v-input input {
//   color: white !important;
//   /* margin: 0; */
//   padding: 0;
//   text-align: center !important;
// }
</style>
