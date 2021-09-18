<template>
  <div>
    {{ count }}
    <el-button @click="changCount">监测watch</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
@Component
export default class App extends Vue {
  count: number = 1

  changCount(): any {
    this.count += 1
  }

  @Watch('count', { immediate: true, deep: true })
  onChangeCount(val: number, oldVal: number) {
    console.log('新值' + val)
    console.log('旧值' + oldVal)
  }
}
</script>