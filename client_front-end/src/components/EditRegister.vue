<template>
  <v-layout row wrap>
    <v-flex xs9 class="text-left">
      <span
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
        @click="$emit('onEdit')" title="Editar">edit</v-icon>
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
    'inEditingMode',
    'name',
    'theRegister'
  ]
}
</script>

<style lang="scss">

</style>
