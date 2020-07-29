<template>
  <v-layout row wrap class="mx-1">
    <v-flex xs8>
      <v-text-field
        :placeholder="placeholder"
        :value="value"
        @input="$emit('onInput', $event)"
        @keyup.enter="$emit('create')"
      ></v-text-field>
    </v-flex>

    <!-- <v-alert type="error" :value="newProjectError">
      {{ newProjectError }}
    </v-alert> -->

    <v-flex xs4 class="text-xs-right">
      <v-btn
        dark
        class="mt-3"
        color="green" @click="$emit('create')">
        <v-icon class="mr-2">add_circle</v-icon>
        Crear
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'CreateRegister',

  props: [
    'placeholder',
    'value'
  ]
}
</script>

<style lang="scss">

</style>
