import Vue from 'vue'
import Vuex from 'vuex'

import board from './board'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    board
  }
})
