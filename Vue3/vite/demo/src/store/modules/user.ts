import { defineStore } from "pinia";

interface UserState {}

export const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {},
  actions: {
    /**
     * @description: login
     */
    async login(params) {
      try {
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
