<template>
  <div>
    <div>{{ message }}</div>
    <div>{{ message2 }}</div>
    <a-button @click="changeMessage">改变message</a-button>

    <h3 style="margin-top: 20px">
      2.shallowRef 创建一个跟踪自身 .value 变化的 ref，但不会使其值也变成响应式的
    </h3>
    <div>{{ person.name }}</div>
    <div>{{ dog.name }}</div>
    <a-button @click="changePerson">改变Person</a-button>
    <a-button @click="changeDog">改变Person</a-button>

    <h3 style="margin-top: 20px">3.customRef 自定义</h3>
    <div>{{ address }}</div>
    <a-button @click="changeAddress">切换</a-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref, isRef, shallowRef, triggerRef, customRef } from 'vue'
// Ref TS对应的接口
// interface Ref<T>{
//   value:T
// }
let message: Ref<string> = ref('信息1')
let message2 = ref<string | number>('信息2')

const changeMessage = () => {
  message.value = '改变信息了'
  message2.value = 'message2修改了'
  console.log(message)

  // isRef 判断是不是一个ref对象
  console.log(isRef(message))
}

// 2.shallowRef 创建一个跟踪自身 .value 变化的 ref，但不会使其值也变成响应式的
type Obj = {
  name: string
}

let person: Ref<Obj> = shallowRef({ name: '里斯' })
let dog: Ref<Obj> = shallowRef({ name: '动物' })

const changePerson = () => {
  person.value.name = 'aa' // 不是响应式的
  triggerRef(person) // 强制更新页面DOM
  console.log(person)
}

const changeDog = () => {
  dog.value = { name: '狗' } // 响应式
}

// 3.customRef 自定义ref  是个工厂函数要求我们返回一个对象 并且实现 get 和 set
function MyRef<T>(value: T) {
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newVal: T) {
        console.log('set')
        value = newVal
        trigger()
      },
    }
  })
}
let address = MyRef('wf')
const changeAddress = () => {
  address.value = '张三'
}
</script>
