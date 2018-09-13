import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const jiucai = r =>
  require.ensure([], () => r(require("@/view/jiucai")), "jiucai");
const myRecord = r =>
  require.ensure([], () => r(require("@/view/winning/myRecord")), "myRecord");
const friendRecord = r =>
  require.ensure(
    [],
    () => r(require("@/view/winning/friendRecord")),
    "friendRecord"
  );
const money = r =>
  require.ensure([], () => r(require("@/view/charge/money")), "money");
const signIn = r =>
  require.ensure([], () => r(require("@/view/login/signIn")), "signIn");
const signUp = r =>
  require.ensure([], () => r(require("@/view/login/signUp")), "signUp");
const rule = r =>
  require.ensure([], () => r(require("@/view/charge/rule")), "rule");
const error = r =>
  require.ensure([], () => r(require("@/view/error/error")), "error");

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "jiucai",
      component: jiucai,
      meta: {
        title: "【9.9韭菜节】万倍回收归零币！注册就能免费玩一次~"
      }
    },
    {
      path: "/winning/myRecord",
      name: "myRecord",
      component: myRecord,
      meta: {
        title: "中奖记录"
      }
    },
    {
      path: "/winning/friendRecord",
      name: "friendRecord",
      component: friendRecord,
      meta: {
        title: "中奖记录"
      }
    },
    {
      path: "/charge/money",
      name: "money",
      component: money,
      meta: {
        title: "充币"
      }
    },
    {
      path: "/charge/rule",
      name: "rule",
      component: rule,
      meta: {
        title: "开奖逻辑"
      }
    },
    {
      path: "/login/signIn",
      name: "signIn",
      component: signIn,
      meta: {
        title: "biger"
      }
    },
    {
      path: "/login/signUp",
      name: "signUp",
      component: signUp,
      meta: {
        title: "biger"
      }
    },
    {
      path: "/error",
      name: "error",
      component: error,
      meta: {
        title: "重新加载"
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});
