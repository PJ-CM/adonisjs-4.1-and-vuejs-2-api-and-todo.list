<template>
  <v-row justify="center">
    <v-dialog v-model="modalConfirmMode" persistent :max-width="setMaxWidth()">
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Open Dialog
        </v-btn>
      </template> -->
      <v-card>
        <v-card-title class="modalConfirmTitle" :class="setTitleBgClass()">{{ modalTitle }}</v-card-title>
        <v-card-text v-if="modalSubTitle !== ''" class="pt-5 pb-2 text-justify">{{ modalSubTitle }} <strong>{{ modalSubData }}</strong></v-card-text>
        <v-card-text class="pt-5 pb-2 text-justify">{{ modalText }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div v-if="modalSecEvent !== ''">
            <v-btn color="black" icon @click="resetModalConfirm" title="Cancelar proceso"><v-icon>cancel_presentation</v-icon></v-btn>
            <v-btn color="orange darken-1" text @click="$emit(modalSecEvent, modalItemType)" :title="setSecBtnTxt()">{{ setSecBtnTxt() }}</v-btn>
          </div>
          <v-btn v-else color="black darken-1" text @click="resetModalConfirm" title="Cancelar proceso">{{ setSecBtnTxt() }}</v-btn>
          <v-btn color="red darken-1" text @click="$emit(modalPrimEvent, modalItemType)" :title="modalPrimBtnTxt">{{ modalPrimBtnTxt }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- <v-dialog
      v-model="modalConfirmFullOrSoftMode"
      max-width="500px"
    >
      <v-card>
        <v-card-title class="warning modalConfirmTitle">
          <span>Advertencia</span>
        </v-card-title>
        <v-card-text class="pt-5 pb-2 text-justify">
          ¿Quiere que todos sus Proyectos y Tareas sean eliminados, igualmente, o desea que sean vinculados a la cuenta general de la aplicación?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="modalConfirmFullOrSoftMode = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </v-row>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'ModalConfirm',

  props: [
    'modalConfirmMode',
    'modalMaxWidth',
    'modalTitleBgClass',
    'modalTitle',
    'modalSubTitle',
    'modalSubData',
    'modalText',
    'modalPrimBtnTxt',
    'modalSecBtnTxt',
    'modalPrimEvent',
    'modalSecEvent',
    'modalItemType'
  ],

  // data() {
  //   return {
  //     variable: ''// valor inicial
  //   }
  // },
  // es lo mismo que esto que sigue

  data: () => ({
    modalMaxWidthDefault: 400,
    modalTitleBgClassDefault: 'error',
    modalPrimBtnTxtDefault: 'Aceptar',
    modalSecBtnTxtDefault: 'Cancelar',

    modalConfirmFullOrSoftMode: false
  }),

  methods: {
    ...mapActions('modalConfirm', [
      'resetModalConfirm'
    ]),
    ...mapMutations('modalConfirm', [
      'toggleModalConfirm'
    ]),
    setMaxWidth () {
      return (this.modalMaxWidth !== null && this.modalMaxWidth !== '' && this.modalMaxWidth !== undefined)
        ? this.modalMaxWidth : this.modalMaxWidthDefault
    },
    setTitleBgClass () {
      return (this.modalTitleBgClass !== null && this.modalTitleBgClass !== '' && this.modalTitleBgClass !== undefined)
        ? this.modalTitleBgClass : this.modalTitleBgClassDefault
    },
    setSecBtnTxt () {
      return (this.modalSecBtnTxt !== null && this.modalSecBtnTxt !== '' && this.modalSecBtnTxt !== undefined)
        ? this.modalSecBtnTxt : this.modalSecBtnTxtDefault
    }
  }
}
</script>

<style scope lang="scss">
.modalConfirmTitle {
  color: white;
}
</style>
