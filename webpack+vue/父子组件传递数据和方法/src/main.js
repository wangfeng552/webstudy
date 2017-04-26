import Vue from "vue"
import Addinput from "./components/Addinput.vue"
new Vue({
    el:"#app",
    //es6
    render:h=>h(Addinput)
    //es5
  /*  render:function (h) {
        return h(Addinput)
    }*/
})

