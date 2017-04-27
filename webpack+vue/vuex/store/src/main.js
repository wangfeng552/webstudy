import Vue from "vue"
import App from "./app.vue"
import Vuex from "vuex"
import store from "./vuex/store"
Vue.use(Vuex);

new Vue({
    store,
    render:h=>h(App)
}).$mount("#app")