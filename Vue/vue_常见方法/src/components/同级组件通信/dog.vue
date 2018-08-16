<template>
  <div>
    <input type="text" v-model="msg">
  </div>
</template>

<script>
  import EventHandler from './EventHandler'
  export default {
    data(){
      return {
        msg : ''
      }
    },
    mounted(){
      let _this = this;
      EventHandler.$on( "myDefineEv", function( data ){
        _this.msg = data;
      } );
    }
  }
</script>


