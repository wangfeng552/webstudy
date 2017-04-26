<template>
    <div class="mk">
        <h2>{{name}}</h2>
        <p>{{age}}</p>
    </div>
</template>
<script>
    import {mapState} from "vuex"
    import {mapGetters} from "vuex"
    export default{
//        方法1
        /*computed:{
            name(){
                return this.$store.state.name //相当于getters里面定义的方法，都是获取数据
            },
            age(){
                return this.$store.state.age
            }
        }*/
//        方法2
        /*computed:mapState({
            name:state=>state.name,
            age:state=>state.age
        })*/
//        方法3
        computed:mapGetters(['name','age']),
    }
</script>