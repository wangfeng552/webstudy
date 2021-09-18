<template>
  <div>
    <div>store</div>
    <el-button @click="login">登录</el-button>
    <div>{{ getUser }}</div>
    <div>{{ getRouters }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation, Action } from 'vuex-class'
@Component
export default class App extends Vue {
  count: number = 1
  @Action('setUser') setUser: any
  login() {
    this.setUser({ name: '张三', age: '46' })
  }

  @Getter('user') getUser: any
  @Getter('routers') getRouters: any
}
</script>