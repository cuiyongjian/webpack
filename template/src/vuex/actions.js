export const setCats = function ({dispatch, state}) {
  /* 请求路径是基于vue-resource默认的root配置的 */
  return this.$http.get('api/cats').then(function (res) {
    res = res.body
    if (res.status === 0) {
      dispatch('SET_CATS', res.data)
    }
  })
}
