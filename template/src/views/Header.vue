<template lang="pug">
  .header
    img.logo(src="~assets/img/logo.png")
    h1
      a(v-link="{path: '/', exact: true}") 我的博客
  .nav(
    :class="{ loading: !cats.length }"
  )
    ul
      li(v-for="item in cats")
        a(v-link="{name: 'cat', params: { cat: item.alias }}") \{{item.name}}
  .search
    //- | 搜索组件占位
    //- 可用这个做个搜索功能：https://github.com/yelingfeng/vuex-tutorial
</template>
