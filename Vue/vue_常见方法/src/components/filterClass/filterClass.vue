<template>
  <div>
    <div class="showico">
      <ul>
        <li v-for="(v,i) in name">
          <span v-if="v.message=='leader'">
            <div :class="v | filterClass">{{v.val}}</div>
          </span>
          <span v-else>
             <div :class="v | filterClass">{{v.val}}</div>
          </span>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        name:[
          {val:123,message:'leader'},
          {val:222,message:'other'},
          {val:333,message:'des'},
          {val:444,message:'des'},
        ]
      }
    },
    filters:{
      filterClass(v,i){
        if(v.val==123){
          return 'red'
        }else if(v.val==222){
          return 'green'
        }else{
          return '#ccc'
        }
      }
    }
  }
</script>

<style>
.red{color:red}
</style>
