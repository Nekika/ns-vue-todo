import * as Storage from 'tns-core-modules/application-settings'

const state = {
    list: []
}

const getters = {
    list: state => { return state.list },
    done: state => { return state.list.filter(t => {return t.done}) }
}

const mutations = {
    setList: function (state, list) {
        state.list = list
    },
    addTodo: function (state, todo) {
        state.list.push(todo)
    },
    deleteTodo: function (state, todo) {
        const index = state.list.indexOf(todo)
        state.list.splice(index, 1)
    }
}

const actions = {
    init: function ({commit}) {
        const todos = Storage.getString('todos')
        commit('setList', todos)
    },
    save: function ({state}) {
        Storage.setString('todos', state.list)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
