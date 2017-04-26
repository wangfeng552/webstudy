const actions={
    actionName({ commit }) {
        commit('CHANGE_NAME_AGE')
    },
    // 单参数的
    actionName2({commit},value){
        commit('SHOW_ACTION',value)
    }
}
export  default actions