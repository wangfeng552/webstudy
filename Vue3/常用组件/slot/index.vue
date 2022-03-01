<template>
  <Child>
    <div>我是默认插槽</div>
    <template #title>
      <h1>我是具名插槽</h1>
    </template>

    <template #footer="{ scope }">
      <footer>作用域插槽--姓名:{{ scope.name }},年龄：{{ scope.age }}</footer>
    </template>
  </Child>
</template>
<script setup>
import Child from "./child"
</script>
