<template {{#pug}}lang="pug"{{/pug}}>
  <div id="app">
    <img class="logo" src="./assets/logo.png">
    <hello></hello>
    <p>
      Welcome to your Vue.js app!
    </p>
    <p style="color:red">
      It seems you are using an outdated version of vue-cli.<br>
      Upgrade to vue-cli@2.x to get access to newer versions of this template.
    </p>
  </div>
</template>

<script>
import Hello from './components/Hello'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export default {
  components: {
    Hello{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
</script>

<style {{#pug}}lang="stylus"{{/pug}}>
html, body
  margin: 0
  padding: 0


</style>
