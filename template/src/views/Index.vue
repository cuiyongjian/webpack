<template lang="pug">
  partial(name="header")
  .home-main(
    :class="{ loading: !catBoxs.length }"
  )
    .catBox(v-for="item in catBoxs")
      h2
        a(v-link="{name: 'cat', params: {cat: item.alias}}") {{item.name}}
      ul.catBox-content
        item-list(
          v-for="p in item.posts",
          :item="p",
          :index="$index+1",
          track-by="id",
          show-date=true
        )

  partial(name="footer")
</template>

<script>
  import ItemList from 'components/ItemList'
  import header from 'views/Header'
  import footer from 'views/Footer'


  export default {
    data () {
      return {
        catBoxs: []
      }
    },
    components: {
      ItemList
    },
    vuex: {
      getters: {
        cats: require('store/getters').getCats
      },
      actions: {
        setCats: require('store/actions').setCats
      }
    },
    route: {
      data ({to}) {
        // 做页面加载前的数据准备
        // 触发vuex所需cats数据，因为其他组件也依赖这个数据，这样避免其他组件再去获取这个cats数据，浪费请求。
        // 而且，可以可以保持数据一致。 或者一旦posts里面的cats列表对vuex这个cats进行修改，那首页也可以同步变更。
        let self = this;
        this.setCats().then(function () {
          let promiseArray = []
          let catBoxs = this.cats; // 临时变量，最后再赋值给this.catBox，要不然不监听变化
          catBoxs.forEach(function (item) {
            let onePromise = self.$http.get('api/posts', {params: {id: item.id}});
            onePromise.then(function (res) {
              item.posts = res.json().data;
            });
            promiseArray.push(onePromise);
          });
          // 待到所有box数据都加载完成，就把整个数组赋值给catBoxs. 整个数组换掉的话，是可以被vue跟踪到的。
          Promise.all(promiseArray).then(function (res) {
            self.catBoxs = catBoxs;
          });
        });
      }
    },
    partials: {
      header: header.template,
      footer: footer.template
    }
  }
</script>

<style lang="stylus">
  @import '~assets/css/variable'
  .home-main
    padding-left 5px
    padding-right 15px
    min-height: 200px
    position: relative
    &.loading:before
      content "文章列表Loading..."
      position absolute
      top 16px
      left 20px
</style>
