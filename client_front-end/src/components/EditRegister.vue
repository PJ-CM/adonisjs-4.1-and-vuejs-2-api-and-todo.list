<template>
  <v-layout row wrap>
    <v-flex xs9 class="text-left">
      <span class="reg_txt" :class="{ 'reg_selected': (currentIdRegisterClicked === idRegister) }"
        @click="$emit('onClick')"
        v-if="!inEditingMode">
        {{ name }}
      </span>
      <v-text-field
        autofocus
        v-if="inEditingMode"
        :value="name"
        @keyup.enter="$emit('onSave')"
        @input="$emit('onInput', $event)"
      ></v-text-field>
    </v-flex>

    <v-flex xs3 class="text-right">
      <v-icon
        v-if="!inEditingMode"
        @click="$emit('onEdit')" title="Editar" :disabled="editingModeDisabled">edit</v-icon>
      <v-icon
        v-if="inEditingMode"
        @click="$emit('onSave')" title="Validar">check</v-icon>
      <v-icon
        @click="$emit('onDelete')" title="Eliminar">delete</v-icon>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'EditRegister',

  props: [
    // 'currentRegisterEditing',
    'currentIdRegisterClicked',
    'inEditingMode',
    'editingModeDisabled',
    'idRegister',
    'name'
  ],

  data: () => ({
    idSelected: null
  })//,

  // OK
  // mounted () {
  //   if (this.currentRegisterClicked) {
  //     this.idSelected = this.currentRegisterClicked.id
  //   } else {
  //     this.idSelected = 0
  //   }
  // }//,

  // data: () => ({
  //   disabled: false
  // }),

  // mounted () {
  //   this.setDisabled()
  // },

  // methods: {
  //   setDisabled () {
  //     if (this.currentRegisterEditing) {
  //       console.log(this.currentRegisterEditing.id, this.idRegister)
  //       this.disabled = this.currentRegisterEditing.id !== this.idRegister
  //     }
  //   }
  // }
}
</script>

<style scope lang="scss">
span.reg_txt:hover {
  cursor: pointer;
}
span.reg_txt:hover, .reg_selected {
  background-color: greenyellow;
}

.v-icon:hover {
  color: green;
}
// button:disabled {
//   cursor: not-allowed;
// }
</style>
