<template lang="pug">
  partial(name="header")

  .posts-main
    bread-crumb(
      :sub-nav="subNav",
      seperator=">"
    )
    router-view

  partial(name="footer")
</template>

<script>
  import BreadCrumb from 'components/BreadCrumb'
  import header from 'views/Header'
  import footer from 'views/Footer'

  export default {
    data () {
      return {
        subNav: []
      }
    },
    components: {
      BreadCrumb
    },
    vuex: {
      getters: {
        cats: require('store/getters').getCats
      },
      actions: {
        setCats: require('store/actions').setCats
      }
    },
    events: {
      'setSubNav': function (data) {
        this.subNav = data;
      }
    },
    route: {
      data ({to}) {
        // 为了让面包屑导航能先
        let self = this;
        function setSubNav() {
          if (to.name === 'cat') {
            // 文章列表页才做处理，详情页直接由Detail.vue来通知这边的subNav属性。
            let curCat = self.cats.filter(item=>item.alias===to.params.cat)[0]
            self.subNav = ['首页', curCat.name]
          }
        }
        if (this.cats.length) {
          setSubNav();
        }
        else {
          this.setCats().then(setSubNav)
        }
      }
    },
    partials: {
      header: header.template,
      footer: footer.template
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
h1 {
  color: #42b983;
}
</style>
