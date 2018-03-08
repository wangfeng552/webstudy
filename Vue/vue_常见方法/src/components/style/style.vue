<template>
  <div class="mes">
    <ul>
      <li v-for="(v,i) in messages">
        <span :style="{width:parseInt((v.a1/v.a2*100))+'%'}">{{v.a1}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        messages: [
          {a1: '12', a2: 14},
          {a1: '44', a2: 100},
          {a1: '32', a2: 100}
        ]
      }
    },
  }
</script>

<style>

</style>