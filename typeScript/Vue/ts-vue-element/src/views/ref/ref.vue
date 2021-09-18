<template>
  <div>
    <div ref="moun">
      {{ count }}
    </div>
    <el-button @click="changCount">监测watch</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
@Component
export default class App extends Vue {
  count: number = 1

  changCount(): any {
    console.log(this.moun)
  }

  @Ref() readonly moun
  mounted() {
    //   在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
    this.$nextTick(() => {
      console.log(this.moun)
    })
  }
}
</script>