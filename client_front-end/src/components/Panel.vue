<template>
  <div class="white elevation-2">
    <v-toolbar
      flat dense dark
      color="green"
    >
      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>
    </v-toolbar>

    <div class="pl-4 pr-4 pt-2 pb-2">
      <slot>:: Sin contenido definido para este sLoT ::</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Panel',
  props: {
    title: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
