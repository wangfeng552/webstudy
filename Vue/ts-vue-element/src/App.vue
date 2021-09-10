<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <el-button @click="show">123</el-button>

    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class App extends Vue {
  name: string = '1234'
  count: number = 2
  hasShow: boolean = true
  list1: number[] = [1, 2, 3, 4]
  list: Array<any> = [1, 2, 3, 'sadf', true]

  x: [string, number] = ['1', 2] //元组 Tuple

  show(): void {
    // void类型像是与any类型相反，它表示没有任何类型
    console.log(1111)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
