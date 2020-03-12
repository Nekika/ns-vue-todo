import Vue from 'vue'
import Vuex from 'vuex'

import todo from './modules/todo'

Vue.use(Vuex)

const state = {
    email: 'hugo.jahnke@gmail.com',
    password: 'h4ytTwzyhN',
    uuid: 'c713f190-63a8-11ea-a27d-cb085bb44065',
    token: null,
    error: null
}

const mutations = {
    setToken: function (state, token) {
        state.token = token
    },
    setError: function (state, error) {
        state.error = error
    }
}

/* eslint-disable no-new */
const store = new Vuex.Store({
    state,
    mutations,
    modules: {
      todo
    }
})

export default store
