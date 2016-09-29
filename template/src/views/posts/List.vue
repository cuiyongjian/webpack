<template lang="pug">
  ul.posts-list
    item-list(
      v-for="p in posts",
      :item="p",
      :index="$index+1",
      track-by="id",
      show-date=true,
      show-summary=true
    )
</template>

<script>
  import ItemList from 'components/ItemList'

  export default {

    data () {
      return {
        page: 1,
        limit: 10,
        posts: []
      }
    },

    components: {
      ItemList
    },

    route: {
      data ({to}) {
        // 拉取文章
        let self = this
        let getPosts = this.$http.get('api/posts', {params: {page: this.page, limit: this.limit}})
        getPosts.then(function (res) {
          res = res.json()
          if (res.status === 0) {
            self.posts = res.data
          }
        })
      }
    }

  }
</script>

<style lang="stylus">

</style>
