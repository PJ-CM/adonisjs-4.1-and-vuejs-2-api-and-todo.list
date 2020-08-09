<template>
  <v-app>
    <ToolBar/>
    <div id="app">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <router-view/>
    </div>
  </v-app>
</template>

<script>
// @ is an alias to /src
import ToolBar from '@/components/ToolBar.vue'

export default {
  name: 'App',
  components: {
    ToolBar
  }
}
</script>

<style lang="scss">

// Variables
@import '@/assets/sass/_variables';

// :root {
//   --color-prim: cadetblue !important;
//   --color-sec: #262626;
// }

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  margin-top: 4rem;
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.v-btn {
  .v-icon {
    margin-right: .11rem;
  }
}

.btn-action {
  background-color: var(--color-btn-action) !important;
}
.btn-action:hover {
  background-color: var(--color-btn-action-hover) !important;
}

.icon-action:hover {
  color: var(--color-btn-action-hover);
}

.alert-errors-gnral ul, .alert-errors-section ul {
  width: 75%;
  margin: 10px auto 0;
}
.alert-errors-gnral ul li, .alert-errors-section ul li {
  text-align: justify;
}
.alert-errors-section {
  font-size: .7rem;
}
</style>
