<template>
  <div class="wrap">
    <div @click="likai">离开</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '123',
      age: 12
    }
  },
  methods: {
    likai() {
      this.$router.push({
        name: 'tree'
      })
    }
  },
  beforeCreate() {
    console.log(this) // =>Vue
    console.log(111111)
    console.log(this.name) // =>undefined
  },
  created() {
    console.log(this.name)
  },
  beforeMount() {
    console.log(this.age)
  },
  mounted() {
    console.log(this.age)
  },
  beforeUpdate() {
    console.log(this.name)
  },
  updated() {
    console.log(this.name)
  },
  beforeDestroy() {
    console.log(this.age)
  },
  destroyed() {
    console.log(this.age)
  }
}
</script>
