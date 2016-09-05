<template lang="pug">
  li.item-list
    span.f-right(v-show="showDate") \{{item.date}}
    span * \{{index}} * |
    a(v-link="{name: 'detail', params: {id: item.id}}") \{{item.title}}
    .summary(v-if="showSummary")
      | \{{item.summary}}
</template>

<script>
export default {
  props: {
    item: Object,
    index: Number,
    showDate: Boolean,
    showSummary: Boolean
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/css/variable"
.item-list
  .f-right
    float: right
</style>
