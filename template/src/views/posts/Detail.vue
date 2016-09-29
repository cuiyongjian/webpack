<template lang="pug">
.posts-detail
  h2 {{post.title}}
  div
    |日期: \{{post.date}}  作者：\{{post.author}} 分类: \{{post.catName}}
  div
    |\{{post.content}}
</template>

<script>
export default {
  data () {
    return {
      post: {}
    }
  },
  route: {
    data ({to}) {
      // 请求文章的详情数据， 详情数据肯定包含了 {文章分类，文章内容，文章标题} 等
      // Http请求，返回的是Promise
      let url = 'api/posts/' + to.params.id
      let self = this;
      this.$http.get(url).then((res) => {
        res = res.json();
        if (res.status === 0) {
          self.post = res.data;
          this.$dispatch('setSubNav', ['首页', self.post.catName, '文章详情'])
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
h1 {
  color: #42b983;
}
</style>
