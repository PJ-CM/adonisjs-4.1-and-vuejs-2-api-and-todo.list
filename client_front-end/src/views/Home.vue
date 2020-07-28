<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo_adonisjs_vuejs.png">
    <HelloWorld msg="Welcome to Your AdonisJS & Vue.js App"/>
  </div>
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
