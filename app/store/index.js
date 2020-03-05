import Vue from 'vue'
import Vuex from 'vuex'

import todo from './modules/todo'

Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
  modules: {
      todo
  }
})

export default store
