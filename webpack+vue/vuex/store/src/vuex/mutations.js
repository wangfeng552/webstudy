// 把数据存入数据库的 API，用来修改 state 的，
// 它是在 store 里面写的，这说明，它就是个半成品，中间量，我们不应该在外面去操作它。
// 建议我们mutation 类型用大写常量表示
const mutations={
    CHANGE_NAME_AGE(state){
        state.name='李四'
        state.age='3025'
    },
    SHOW_USER(state,data){
        state.username=data
    },
    SHOW_ACTION(state,data){
        state.wf=data
    }
}
export default mutations