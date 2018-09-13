const admin = {
  state: {
    userInfo: "",
    sourceParam: "",
    activityId: ""
  },
  mutations: {
    LOGIN(state, val) {
      state.userInfo = val;
    },
    LOGOUT(state = {}) {
      state.token = "";
      state.userInfo = {};
    },
    GETSOURCEPARAM(state, val) {
      state.sourceParam = val;
    },
    GETAPPTOKEN(state, val) {
      state.userInfo = val;
    },
    GETACTIVITYID(state, val) {
      state.activityId = val;
    }
  },
  actions: {
    /*login({ commit, state }, val) {
      return new Promise((resolve, reject) => {
        const { token, ...userInfo } = val;
        if (!token || !Object.keys(userInfo).length) {
          reject("error");
          return;
        }
        commit("LOGIN", val);
        resolve();
      });
    },*/
    login({ commit }, val) {
      commit("LOGIN", val);
    },
    logout({ commit }) {
      commit("LOGOUT");
      localStorage.clear();
      sessionStorage.clear();
      location.href = "/";
    },
    getSourceParam({ commit }, val) {
      commit("GETSOURCEPARAM", val);
    },
    getAppToken({ commit }, val) {
      commit("GETAPPTOKEN", val);
    },
    getActivityId({ commit }, val) {
      commit("GETACTIVITYID", val);
    }
  }
};

export default admin;
