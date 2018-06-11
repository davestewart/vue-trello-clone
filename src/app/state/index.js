import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate';

import board from './board'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    persistedState()
  ],
  modules: {
    board
  }
})
