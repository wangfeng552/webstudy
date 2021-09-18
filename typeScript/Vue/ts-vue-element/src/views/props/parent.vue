<template>
  <div>
    <div>父组件</div>
    <div>{{ parentCount }}</div>
    -----------------------------
    <child
      :name="name"
      @get-child-val="getChildVal"
      @getOldVal="getOldVal"
    ></child>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import child from './child.vue'
@Component({
  components: {
    child
  }
})
export default class App extends Vue {
  @Provide() name: string = '张三'
  @Provide() parentCount: number = 0
  getChildVal(v: any) {
    console.log(v)
    this.parentCount = v
  }
  getOldVal(v: any) {
    console.log(v)
    this.parentCount = v
  }
}
</script>