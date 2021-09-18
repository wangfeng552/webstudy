<template>
  <div>
    <div>--------------后代子孙页面--------------</div>

    <p>{{ foo }}</p>
    <ul>
      <li v-for="(v, i) in persenList">{{ v }}</li>
    </ul>

    <div>---------------------------</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  @Inject() foo!: string
  @Inject() persenList!: string
}
</script>

