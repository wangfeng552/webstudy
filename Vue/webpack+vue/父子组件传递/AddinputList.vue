<template>
    <div>
        <li >{{messages}}<button @click="$emit('del')">X</button></li>
        <li >{{messages}}<button @click="toParent">X</button></li>
    </div>

</template>
<script>
  export default{
      props:["messages"],
      methods:{
          toParent(){
              this.$emit('del','value')
          }
      }
  }
</script>