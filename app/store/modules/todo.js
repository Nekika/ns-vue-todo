import axios from 'axios'

const state = {
    list: null
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
        return new Promise((resolve, reject) => {
            const url = "https://api.todolist.sherpa.one/users/signin"
            const config = { auth: { username: rootState.email, password: rootState.password } }
            axios.post(url,{}, config)
                .then(res => {
                    commit('setToken', res.data.token, {root: true})
                    resolve()
                })
                .catch(err => reject(err))
        })
    },
    getTodos: function ({commit, rootState}){
        return new Promise((resolve,reject) => {
            const url = `https://api.todolist.sherpa.one/users/${rootState.uuid}/todos`
            const config = { headers: { Authorization: `Bearer ${rootState.token}` } }
            axios.get(url, config)
                .then(res => {
                    commit('setList', res.data.todos)
                    resolve()
                })
                .catch(err => reject(err))
        })
    },
    addTodo: function ({commit, rootState}, todo) {
        return new Promise((resolve, reject) => {
            const url = `https://api.todolist.sherpa.one/users/${rootState.uuid}/todos`
            const config = { headers: { Authorization: `Bearer ${rootState.token}` } }
            axios.post(url, todo, config)
                .then(resolve())
                .catch(err => reject(err))
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
