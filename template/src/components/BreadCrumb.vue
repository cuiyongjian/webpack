<template lang="pug">
  .breadcrumb
    span {{wrapSubNav}}
</template>

<script>
export default {
  props: {
    subNav: Array,
    seperator: String
  },
  computed: {
    wrapSubNav () {
      return this.subNav.join(this.seperator)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~assets/css/variable.styl"


</style>
