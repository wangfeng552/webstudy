const user={
    //放置公用状态  即共享的数据
    state:{
      count: 0,
      history: [],
    },
    // 把数据存入数据库的 API，用来修改 state 的，
    // 它是在 store 里面写的，这说明，它就是个半成品，中间量，我们不应该在外面去操作它。
    // 建议我们mutation 类型用大写常量表示
    mutations:{
      ADD_COUNT (state) {
        state.count++
        state.history.push('add_count')
      },
      SALE_COUNT (state) {
        state.count--
        state.history.push('sale_count')
      },
      REMOVE_COUNT(state){
        state.count = ''
      }
    },
    actions:{
      addCount ({commit}) {
        commit('ADD_COUNT')
      },
      saleCount ({commit, state}) {
        if (state.count !== 0) {
          commit('SALE_COUNT')
        }
      },
      evenAdd ({commit, state}) {
        if (state.count % 2 === 0) {
          commit('ADD_COUNT')
        }
      },
      yanchiAdd ({commit}) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            commit('ADD_COUNT')
            resolve('成功了')
          }, 1000)
        })
      }
    }
}

export default user
