import VueDevtools from 'nativescript-vue-devtools'
import Vue from "nativescript-vue"
import Store from './store'
import App from "./components/App"

import {decode, encode} from 'base-64'

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}

Vue.use(VueDevtools)

new Vue({
    store: Store,
    render: h => h('frame', [h(App)])
}).$start();
