<template>
  <div>
    子组件获取父组件的名字：{{ name }}
    <el-button @click="getChildVal">触发父组件的方法</el-button>
    <el-button @click="setParentVlaue">触发父组件的方法</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
@Component
export default class App extends Vue {
  count: number = 1
  @Prop(String) name!: string //单类型
  @Prop([String, Number]) name1!: string | number //多种类型
  @Prop({ default: '李四' }) name2!: string //默认值

  @Emit()
  getChildVal(): number {
    return 10
  }
  // 老方法
  setParentVlaue() {
    this.count += 1
    this.$emit('getOldVal', this.count)
  }
}
</script>