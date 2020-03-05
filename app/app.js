import VueDevtools from 'nativescript-vue-devtools'
import Vue from "nativescript-vue"
import Store from './store'
import App from "./components/App"

Vue.use(VueDevtools())

new Vue({
    Store,
    render: h => h('frame', [h(App)])
}).$start();
