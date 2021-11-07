<template>
  <div>
    <button @click="say('name', $event)">dianji</button>
    <input type="number" @mousewheel.prevent />
  </div>
</template>

<script>
export default {
  methods: {
    say(a, event) {
      event.preventDefault()
      event.target.innerHTML
      const rect = e.target.getBoundingClientRect()
      console.log(rect)
    },
  },
}
</script>

<style scoped></style>
