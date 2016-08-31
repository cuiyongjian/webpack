<template {{#pug}}lang="pug"{{/pug}}>
{{#pug}}
div.app
  h1 {{msg}}
{{else}}
<div class="app">
  <h1>{{msg}}</h1>
</div>
{{/pug}}
</template>

<script>
import Hello from './components/Hello'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export default {
  components: {
    Hello{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
</script>

<style {{#stylus}}lang="stylus"{{/stylus}}>
{{#stylus}}
html, body
  margin: 0
  padding: 0
{{else}}
html, body {
  margin: 0;
  padding: 0;
}
{{/stylus}}

</style>
