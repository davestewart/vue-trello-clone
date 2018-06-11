import Vue from 'vue'
import Vuex from 'vuex'

import lists from './modules/board'
// import tasks from './modules/tasks'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    lists
  }
})
