<template>
  <div>
    <input v-on:click="send" type="button" value="发送">
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
    methods : {
      send(){
        EventHandler.$emit( 'myDefineEv', "" );
      }
    },
/*    mounted (){
      let _this = this;
      EventHandler.$on( "RDefineEv", function( data ){
        _this.msg = data;
      } );
    }*/
  }
</script>


