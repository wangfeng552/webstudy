<template>
    <div class="mk">
        <!--方法1-->
        <input type="text" v-model="newText">
        <p>{{username}}</p>
        <button @click="changeText">点击</button>

        <!--方法2-->
      <!--  <div class="name">{{name}}{{age}}</div>
        <button @click="changeNameAge">改变姓名年龄</button>-->
    </div>
</template>
<script>
    import {mapGetters} from "vuex"
    import {mapMutations} from "vuex"
    export default{
      data(){
          return {newText:""}
      },
        computed:mapGetters(['username','name','age']),

//      方法1可以传参数
        methods:{
            changeText(){
                this.$store.commit('SHOW_USER',this.newText)
            }
        }

//      方法2不能传参数
//        methods:mapMutations({changeNameAge:"CHANGE_NAME_AGE"})
    }
</script>