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
    addTodo: function ({dispatch, rootState}, todo) {
        return new Promise((resolve, reject) => {
            const url = `https://api.todolist.sherpa.one/users/${rootState.uuid}/todos`
            const config = { headers: { Authorization: `Bearer ${rootState.token}` } }
            axios.post(url, todo, config)
                .then(() => { return dispatch('getTodos')})
                .catch(err => reject(err))
                .finally(resolve())
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
