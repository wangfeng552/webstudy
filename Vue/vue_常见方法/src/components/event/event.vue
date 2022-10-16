<template>
  <div @click.self="show">
    1234
    <button @click="say('name', $event)">dianji</button>
    <input type="number" @mousewheel.prevent />

    <!-- capture捕获模式从上往下 -->
    <div @click.capture="show">
      <h2>我是标题</h2>
      <ul>
        <li @click="getLi">capture捕获模式从上往下</li>
      </ul>
    </div>

    <!-- 阻止冒泡 -->
     <div @click="show">
      <h2>我是标题</h2>
      <ul>
        <li @click.stop="getLi">capture捕获模式从上往下</li>
      </ul>
    </div>

    <!-- 鼠标按键 middle -->
    <div @click.right="getLi">鼠标右键</div>
    
    <!-- 键盘按键 -->
    <div @keydown.enter="show"></div>
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

    show(e) {
      alert(2)
      console.log(e)
      e.stopPropagation()
    },
    getLi() {
      alert(1)
    },
  },
}
</script>

<style scoped></style>
