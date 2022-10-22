<template>
  <div>
    <!-- 挂载点 -->
    <div id="module"></div>

    <!-- 要挂载的内容 -->
    <teleport to="#module">
      <div>123</div>
    </teleport>
  </div>
</template>

<script lang="ts"></script>

<style scoped></style>
