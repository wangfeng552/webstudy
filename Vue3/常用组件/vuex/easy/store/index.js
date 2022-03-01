import { createStore } from "vuex"

// 使用常量替代 Mutation 事件类型
export const INCREMENT = "INCREMENT"

const store = createStore({
  state: {
    count: 0,
  },
  getters: {
    count: (state) => {
      return state.count
    },
  },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
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
    // 组合Action
    actionA({ commit }, isTrue) {
      console.log(isTrue)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (isTrue.isShow) {
            commit(INCREMENT)
            resolve()
          } else {
            reject()
          }
        }, 1000)
      })
    },
    actionB({ dispatch, commit }) {
      return dispatch("actionA").then(() => {
        commit(INCREMENT)
      })
    },
  },
})

export default store
