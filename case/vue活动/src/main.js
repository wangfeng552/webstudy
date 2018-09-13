// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store/index";
import "./assets/js/rem";
import "./assets/css/common.css";
import {
  Header,
  Button,
  Lazyload,
  Navbar,
  TabItem,
  Field,
  InfiniteScroll,
  Spinner,
  Popup,
  Picker
} from "mint-ui";
import "mint-ui/lib/style.css";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import SharePost from "@/plugins/SharePost";
Vue.config.productionTip = false;
require("../static/css/nativeShare.css");

Vue.component(Button.name, Button);
Vue.component(Header.name, Header);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Field.name, Field);
Vue.component(Spinner.name, Spinner);
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
Vue.use(Lazyload);
Vue.use(InfiniteScroll);
Vue.use(VueAwesomeSwiper);
Vue.use(SharePost);

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
