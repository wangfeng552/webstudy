import { queryUserInfo } from "Api"
export const state = () => {
  return {
    userInfo: {}
  }
}
export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {},
  async updateUserInfo({ commit }) {
    const userInfo = await queryUserInfo()
    commit("setUserInfo", userInfo)
  }
}
export const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data
  }
}
