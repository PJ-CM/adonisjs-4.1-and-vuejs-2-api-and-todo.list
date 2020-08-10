<template>
  <v-container>
    <!-- <img alt="Vue logo" src="../assets/images/logo_adonisjs_vuejs.png"> -->
    <!-- referido hacia "./src", es lo mismo "../" que "@/"  -->
    <img alt="Vue logo" src="@/assets/images/logo_adonisjs_vuejs.png">
    <HelloWorld msg="Welcome to Your AdonisJS & Vue.js App"/>
  </v-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
