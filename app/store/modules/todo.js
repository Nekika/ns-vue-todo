import axios from 'axios'

const state = {
    list: []
}

const getters = {
    list: state => { return state.list },
    doneTodos: state => { return state.list.filter(t => {return t.done}) }
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
    },
    update: function (state, todo) {
        const index = state.list.indexOf(todo)
        state.list[index] = todo
    }
}

const actions = {
    init: function ({commit, rootState}) {
        const url = "https://api.todolist.sherpa.one/users/signin"
        const config = {
            auth: {
                username: rootState.email,
                password: rootState.password
            }
        }
        axios.post(url,{}, config)
            .then(res => commit('setToken', res.data.token, {root: true}))
            .catch(err => {
                console.log(err);
                commit('setError', err, {root: true})
            })
    },
    save: function ({state}) {
        return new Promise((resolve, reject) => {
            try {
                Storage.setString('todos', JSON.stringify(state.list))
                resolve()
            } catch (e) { reject(e) }
        })
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
    },
    updateTodo: function ({commit}, todo) {
        return new Promise((resolve, reject) => {
            try {
                commit('update', todo)
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
