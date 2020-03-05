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
    push: function (state, todo) {
        state.list.push(todo)
    },
    remove: function (state, todo) {
        const index = state.list.indexOf(todo)
        state.list.splice(index, 1)
    }
}

const actions = {
    init: function ({commit}) {
        const todos = Storage.getString('todos')
        commit('setList', JSON.parse(todos))
    },
    save: function ({state}) {
        Storage.setString('todos', JSON.stringify(state.list))
        console.log(Storage.getString('todos'))
    },
    addTodo: function ({commit}, todo) {
        return new Promise((resolve, reject) => {
            try {
                commit('push', todo)
                resolve()
            } catch (e) { reject(e) }
        })
    },
    removeTodo: function ({commit}, todo) {
        return new Promise((resolve, reject) => {
            try {
                commit('remove', todo)
                resolve()
            } catch (e) { reject(e) }
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
