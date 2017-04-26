<template>
    <div class="mk">
        <input type="text" v-model="newText">
        <div class="name">{{name}}{{age}}</div>
        <button @click="addname">改变姓名年龄</button>
        <p>{{wf}}</p>
    </div>
</template>
<script>
    import {mapActions} from "vuex";
    export default{
        data(){
            return {newText:""}
        },
        computed:{
            name(){
                return this.$store.state.name
            },
            age(){
                return this.$store.state.age
            },
            wf(){
                return this.$store.state.wf
            }
        },
        /*方法1*/
       methods:{
            addname(){
                this.$store.dispatch('actionName2',this.newText)  //可以传参数
//                排错
                /*try{
                    this.$store.dispatch('actionName2',this.newText)
                } catch(error){
                    alert(error)
                }*/
            }
       }
//       方法2
//        methods: mapActions({addname:"actionName"})
    }
</script>