<template>
  <div>
    <h3>watch</h3>
    <p>
      watch第一个参数监听源 <br />
      watch第二个参数回调函数cb（newVal,oldVal）<br />
      watch第三个参数一个options配置项是一个对象{ immediate:true //是否立即调用一次 deep:true
      //是否开启深度监听
    </p>

    <div>
      {{ message }}
    </div>
    <a-button @click="changeMessage">监听message</a-button>

    <div>{{ person }}</div>
    <a-button @click="changePerson">监听person</a-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
// 监听ref
let message = ref({
  nav: {
    bar: {
      name: '',
    },
  },
})

let message2 = ref(1)

const changeMessage = () => {
  message.value.nav.bar.name = '111'
}

watch(
  [message, message2],
  (newVal, oldVal) => {
    console.log('新的值---', newVal)
    console.log('旧的值---', oldVal)
  },
  { immediate: true, deep: true }
)
// 监听reactive
let person = reactive({
  nav: {
    bar: {
      title: '',
    },
  },
  name: '',
  address: '',
})

const changePerson = () => {
  person.nav.bar.title = '标题'
  person.name = '李四'
}

watch(person, (newVal, oldVal) => {
  console.log('新的值---', newVal)
  console.log('旧的值---', oldVal)
})

// 监听reactive单一值
watch(
  () => person.name,
  (newVal, oldVal) => {
    console.log('新的name---', newVal)
    console.log('旧的name---', oldVal)
  }
)

// watchEffect
// 立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。
// 如果用到message 就只会监听message 就是用到几个监听几个 而且是非惰性 会默认调用一次
watchEffect(() => {
  //   console.log('name', person.name)
})

// 清除副作用
watchEffect((oninvalidate) => {
  // 就是在触发监听之前会调用一个函数可以处理你的逻辑例如防抖
  oninvalidate(() => {
    // console.log('先处理')
  })
  //   console.log('name', person.name)
})

// 停止跟踪 watchEffect返回一个函数 调用之后将停止更新
const stop = watchEffect(
  (oninvalidate) => {
    oninvalidate(() => {})
    console.log('name', person.name)
  },
  {
    flush: 'post', // pre 组件更新前执行   sync 强制效果始终同步触发 post 组件更新后执行
    onTrigger() {}, // 可以帮助我们调试watchEffect
  }
)

stop()
</script>

<style></style>
