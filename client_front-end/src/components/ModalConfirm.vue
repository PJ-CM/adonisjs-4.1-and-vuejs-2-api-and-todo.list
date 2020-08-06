<template>
  <v-row justify="center">
    <v-dialog v-model="modalConfirmMode" persistent max-width="300">
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
        <v-card-title class="error modalConfirmTitle">{{ modalTitle }}</v-card-title>
        <v-card-text class="pt-5 pb-2 text-justify">{{ modalText }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black darken-1" text @click="toggleModalConfirm(false)">Cancelar</v-btn>
          <v-btn color="red darken-1" text @click="$emit('on-delete-confirmed', modalItemType)">{{ modalBtnText }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'ModalConfirm',

  props: [
    'modalConfirmMode',
    'modalTitle',
    'modalText',
    'modalBtnText',
    'modalItemType'
  ],

  methods: {
    ...mapMutations('modalConfirm', [
      'toggleModalConfirm'
    ])
  }
}
</script>

<style scope lang="scss">
.modalConfirmTitle {
  color: white;
}
</style>
