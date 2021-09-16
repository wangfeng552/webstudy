import { ActionTree } from 'vuex'
const actions: ActionTree<any, any> = {
    //存储用户信息
    //异步方法
    async setUser({ state, commit }, user: any) {
        //解析用户传递过来的token
        const decoded: any = user;
        //调用SET_USER方法 传递user用户信息到mutations
        commit('SET_USER', decoded);
        //解构获取decoded 根据key进行根据权限处理
        const { key } = decoded;

        commit('SET_ROUTER', 123);
    }
}
export default actions