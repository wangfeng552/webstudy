<template>
  <div>
    <input type="text" v-model="person.name">
    <input type="text" v-model="person.age">
    <button @click="tijiao">提交</button>
    <div class="message" v-for="(v,i) in personArray">
      <h2>{{v.name}}---{{v.age}}--- <button @click="del(i)">删除</button> </h2>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        person:{
          name:'',
          age:''
        },
        personArray:[]
      }
    },
    methods:{
      tijiao(){
        this.personArray.push(this.person);
        this.person={
          name:'',
          age:''
        }
      },
      del(i){
        this.personArray.splice(i,1)
      }
    }
  };
</script>
