<template lang="pug">
  .empty-page
    h1 页面找不到了
    | \{{seconds}} 秒后跳转到首页 \{{dots.join('')}}
</template>

<script>
export default {
  data () {
    return {
      dots: ['.'],
      seconds: 10
    }
  },
  route: {
    data ({to, redirect}) {
      let self = this;
      this.$interval = this.$interval || {};
      this.$interval.dots = setInterval(function () {
        if (self.dots.length < 5) {
          self.dots.push('.')
        }
        else {
          // 注意直接修改数组长度，vue可能检测不到数组变化。http://vuejs.org.cn/guide/list.html#u53D8_u5F02_u65B9_u6CD5
          self.dots.length = 0;
        }
      }, 500)
      this.$interval.time = setInterval(function () {
        self.seconds--
        if (self.seconds === 0) {
          redirect('/')
        }
      }, 1000)
    },
    deactivate () {
      // 在组件destroy之前，移除掉定时器
      clearInterval(this.$interval.dots)
      clearInterval(this.$interval.time)
    }
  }
}
</script>

<style lang="stylus">
@import '~assets/stylus/variable'

</style>
