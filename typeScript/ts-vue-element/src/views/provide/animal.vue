<template>
  <div>
    provide
    <dog></dog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import dog from './dog.vue'
@Component({
  components: {
    dog
  }
})
export default class App extends Vue {
  @Provide() foo: string = '父组件的值通过provide声明'
  @Provide() persenList: any[] = [
    { name: '张三', age: 12 },
    { name: '张三1', age: 122 },
    { name: '张三2', age: 22 }
  ]
}
</script>

