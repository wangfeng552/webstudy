<template>
  <div>
    <input type="text" v-model="newText" @keyup.enter="add">
    <!--<li is="addinput-list" :messages="v.name" v-for="(v,i) in animals" @del="animals.splice(i,1)"></li>-->
    <addinput-list :key="v.name" :messages="v.name" v-for="(v,i) in animals" @del="animals.splice(i,1)"></addinput-list>
    <child ref="child" :class="{active:isShow}"></child>
    <button @click="clickParent">显示</button>
  </div>
</template>
<script>
  import AddinputList from './AddinputList.vue'
  import Child from './child.vue'
  export default{
      data(){
          return {
              newText:"",
              isShow:true,
              animals:[
                  {name:"123"},
                  {name:"456"},
              ]
          }
      },
      components:{AddinputList,Child},
      methods:{
          add(){
              this.animals.push({name:this.newText});
              this.newText=''
          },
          clickParent(){
              //访问子组件
            this.$refs.child.showClick("123")
          }
      }
  }
</script>