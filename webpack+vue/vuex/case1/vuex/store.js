import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
const store=new Vuex.Store({
    //定义状态
    state:{
        author:"miss Wrong"
    },
    mutations:{
        newAuthor(state,msg){   // state 就是 $store.state | msg 需要另外传入
            state.author=msg
        }
    }
})
export  default  store
// http://www.jb51.net/article/110212.htm