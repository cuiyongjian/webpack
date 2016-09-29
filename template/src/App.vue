<template lang="pug">
#app
  router-view

</template>

<script>
import BreadCrumb from 'components/BreadCrumb'

export default {
  data () {
    return {

    }
  },
  // App的replace设置为false，避免覆盖所挂载的body标签
  replace: false
}
</script>

<style lang="stylus">
@import "~assets/stylus/variable"

/* 页面全局 */
html, body
  margin: 0
  padding: 0
body
  background-color: $color-site-bg
a
  text-decoration: none
  color: #000
a:hover
  color: #e00
#app
  width: 80%
  position: relative
  margin: 0 auto

@media screen and (max-width: 700px)
  #app
    width: 100%


/* 页面头部 */
.header
  h1
    display: inline-block
    margin: 0
    padding: 0
  img
    display: inline-block
    width: 28px
    height: 28px
.nav
  min-height: 20px
  position: relative
  ul,li
    list-style: none
  li
    display: inline-block
    margin: 0 2px
    background: $color-ele-bg
  li:hover
    background: #ccc
  a
    padding: 5px 10px
    display: block
  a.active
    background-color: #333

  &.loading:before
    content "导航Loading..."
    position absolute
    top 16px
    left 20px


/* 页面尾部 */
.footer
  text-align: center
  height: 220px
  line-height: 220px
  border-top: 2px solid #ccc
  background-color: #111
  color: white
</style>
