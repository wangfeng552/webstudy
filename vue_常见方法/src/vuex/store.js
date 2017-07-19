import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import loc from './loc'
import persiste from './persiste'
import city from './city'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {user, loc, persiste,city},
  getters,
  plugins: [createPersistedState(
    {
      // storage: window.sessionStorage, //设置存储地方
      key: 'wf'                       //设置存储的名字
    }
  )],
})

export default store


// Vuex 就是前端为了方便数据的操作而建立的一个” 前端数据库

/*将某些data变成组件间公用的状态，组件随时可以访问和响应，解决了props传值得链式响应的代码冗余
 * 给状态配以公用的方法，将状态的变更及时响应并处理
 *
 * state         数据库
 * getters       取数据
 * mutatuions    存数据用来修改state
 * actions       处理完数据 在存到数据库中
 *
 * 后（qian）端通过 action处理数据，然后通过 mutation 把处理后的数据放入数据库（state）中，谁要用就通过 getter从数据库（state）中取。
 * */
