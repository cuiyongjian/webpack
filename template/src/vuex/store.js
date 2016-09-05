import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)


const state = {
  cats: []
}

const mutations = {
  SET_CATS (state, cats) {
    state.cats = cats
  }
}

export default new Vuex.Store({
  state,
  mutations
})
