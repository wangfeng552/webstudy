import { createStore } from "vuex"

// // 使用常量替代 Mutation 事件类型
export const INCREMENT = "INCREMENT"
const user = {
  namespaced: true, //带命名空间的模块
  state: () => ({
    count: 0,
  }),
  mutations: {
    [INCREMENT](state) {
      state.count++
    },
  },
  actions: {
    increment({ commit }, val) {
      setTimeout(() => {
        commit(INCREMENT)
        console.log(val)
      }, 1000)
    },
  },
}

const store = createStore({
  modules: {
    user,
  },
})

export default store
