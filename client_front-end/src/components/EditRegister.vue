<template>
  <v-layout row wrap>
    <v-flex xs9 class="text-left">
      <slot></slot>
      <!-- <span class="reg_txt" :class="{ 'reg_selected': (currentIdRegisterClicked === idRegister) }" -->
      <span :class="{
          'reg_txt': classRegisterHover,
          'reg_selected': (currentIdRegisterClicked === idRegister),
          'reg_text_struck_through': isCompletedCssTxt
        }"
        @click="$emit('on-click')"
        :title="(currentIdRegisterClicked === idRegister) ? 'Clic para deseleccionarlo' : 'Clic para elegirlo'"
        v-if="!inEditingMode">
        {{ name }}
      </span>
      <v-text-field
        autofocus
        v-if="inEditingMode"
        :value="name"
        @keyup.enter="$emit('on-save')"
        @input="$emit('on-input', $event)"
      ></v-text-field>
    </v-flex>

    <v-flex xs3 class="text-right">
      <v-icon
        class="icon-action"
        v-if="!inEditingMode"
        @click="$emit('on-edit')" title="Editar" :disabled="editingModeDisabled">edit</v-icon>
      <v-icon
        class="icon-action"
        v-if="inEditingMode"
        @click="$emit('on-save')" title="Validar">check</v-icon>
      <v-icon
        class="icon-action"
        @click="$emit('on-delete')" title="Eliminar" :disabled="!isCompletedBtnDel">delete</v-icon>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'EditRegister',
  css_fijo_hover: 'reg_txt',

  props: [
    // 'currentRegisterEditing',
    'currentIdRegisterClicked',
    'classRegisterHover',
    'inEditingMode',
    'editingModeDisabled',
    'idRegister',
    'name',
    'isCompletedCssTxt',
    'isCompletedBtnDel'
  ]//,

  // OK
  // data: () => ({
  //   idSelected: null
  // })//,

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
  // background-color: greenyellow;
  background-color: var(--color-reg_selected);
}
span.reg_text_struck_through {
  text-decoration: line-through;
}

// .v-icon:hover {
//   color: green;
// }

// button:disabled {
//   cursor: not-allowed;
// }
</style>
