const user = {
  //放置公用状态  即共享的数据
  state: {
    name: "张三",
    count: 12
  },
  // 把数据存入数据库的 API，用来修改 state 的，
  // 它是在 store 里面写的，这说明，它就是个半成品，中间量，我们不应该在外面去操作它。
  // 建议我们mutation 类型用大写常量表示
  mutations: {
    ADD_INPUT(state) {
      state.name = "123"
    },
    CHANGE_TEXT(state, val) {
      state.name = parseInt(val) + parseInt(state.count)
    }
  },
  actions: {
    action1({ commit }) {
      commit("ADD_INPUT")
    },
    action2({ commit }, val) {
      commit("CHANGE_TEXT", val)
    },
    async checkName({ commit }) {
      commit('ADD_INPUT', await getUserName())
    },
    async checkPeople({ dispatch, commit }) {
      await dispatch("checkName")
      commit("CHANGE_TEXT", await getOtherUserName())
    }
  }
}

export default user

// 从sessionStrage取数据,不会触发更新,在这种情况下可以创建一个新的对象，让它包含原对象的属性和新的属性：
/*
const loc = {
  //放置公用状态  即共享的数据
  state: {
    name:JSON.parse(sessionStorage.getItem('SESSION_NAME')) || {}
  },
  wf:{},
  mutations: {
    LOGIN(state,val = {}){
      state.name = Object.assign({},state.name,val);
      sessionStorage.setItem('SESSION_NAME', JSON.stringify(val))
    }
  },
  actions: {
    login({commit}, val){
      commit("LOGIN", val)
    }
  }
}

export default loc*/


export default {
  namespaced: true,  // 为了解决不同模块命名冲突的问题，将不同模块的namespaced: true
  state,
  mutations,
  actions
}