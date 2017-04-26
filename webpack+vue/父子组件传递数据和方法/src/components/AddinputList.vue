<template>
    <li >{{messages}}<button @click="$emit('del')">X</button></li>
</template>
<script>
  export default{
      props:["messages"]
  }
</script>