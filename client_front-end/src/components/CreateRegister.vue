<template>
  <v-layout row wrap class="mx-1">
    <v-flex xs8>
      <v-text-field
        :placeholder="placeholder"
        :value="value"
        @input="$emit('on-input', $event)"
        @keyup.enter="$emit('create')"
        :disabled="disableRegisterCreatingMode"
      ></v-text-field>
    </v-flex>

    <!-- <v-alert type="error" :value="newProjectError">
      {{ newProjectError }}
    </v-alert> -->

    <v-flex xs4 class="text-right">
      <v-btn
        dark
        class="mt-3 btn-action" @click="$emit('create')"
        :disabled="disableRegisterCreatingMode">
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
    'value',
    'disableRegisterCreatingMode'
  ]
}
</script>

<style scope lang="scss">
// .mt-3.theme--dark.v-btn.v-btn--contained.v-btn--disabled.v-size--default, .v-text-field {
//   cursor: not-allowed;
//   background-color: blue;
// }

// .v-btn {
//   background-color: var(--color-btn-action) !important;
// }
.btn-action.mt-3.theme--dark.v-btn.v-btn--contained.v-btn--disabled.v-size--default {
  background-color: hsla(182, 28%, 75%, 0.69) !important;
  color: hsla(0, 0%, 100%, 0.84) !important;
}
</style>
