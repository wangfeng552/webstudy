<template>
  <div>
    {{ name }} ：{{age}}
    <button @click="changeName">改变name</button>
  </div>
</template>

<script lang="ts">
import {  ref, reactive, toRefs,onRenderTracked,onRenderTriggered} from "vue"

export default ({
 
  setup() {
     console.log('aaaaa');
    const state = reactive({
      name: "aaa",
      age: 12,
      changeName: () => {
        state.name = "真嘎部分三"
        state.age = 25
      },
    })
   
    

    const refsState = toRefs(state)


// 监听所有
onRenderTracked((event)=>{
  console.log(event);
  
})
// 监听单独
onRenderTriggered((event)=>{
  console.log(event);
  
})

     watch(() => state.name, (newVal, oldVal) => {
  console.log(newVal + "=newVal")
  console.log(oldVal + "=oldVal")
},{deep:true})

    return {
      ...refsState,
    }
  },
})
</script>

<style scoped></style>
