<template>
  <div>
    <a-button>确认</a-button>
    注册全局组件
    <p>
      在main.ts 引入我们的组件跟随在createApp(App) 后面 切记不能放到mount 后面这是一个链式调用用
    </p>
    <p>import Button from './components/button/index'</p>
    <p>app.component('Button', Button)</p>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
