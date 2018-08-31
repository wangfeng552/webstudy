const admin = {
  state: {
    userInfo: "",
    sourceParam: ""
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
    }
  },
  actions: {
    login({ commit, state }, val) {
      return new Promise((resolve, reject) => {
        const { token, ...userInfo } = val;
        if (!token || !Object.keys(userInfo).length) {
          reject("error");
          return;
        }
        commit("LOGIN", val);
        resolve();
      });
    },
    logout({ commit }) {
      commit("LOGOUT");
      localStorage.clear();
      sessionStorage.clear();
      location.href = "/";
    },
    getSourceParam({ commit }, val) {
      commit("GETSOURCEPARAM", val);
    }
  }
};

export default admin;
