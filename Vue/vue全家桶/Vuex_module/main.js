import Vue from "vue"
import App from "./app.vue"
import store from "./store/index"

new Vue({
    store,
    render:h=>h(App)
}).$mount("#app")