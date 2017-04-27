<template>
    <div class="mk">
        <div class="a1">{{name}}</div>
        <button @click="changeName">点击</button>
    </div>
</template>
<script>
    import {mapGetters}  from "vuex"

    //    方法1，传参数
    export default{
        computed: mapGetters(['name']),
        methods: {
            changeName(){
                this.$store.commit("CHANGE_TEXT", '12')
            }
        }
    }

    //  方法2 不能传参数
    /*import {mapMutations} from "vuex"
     export default{
     computed: mapGetters(['name']),
     methods: mapMutations({'changeName': 'ADD_INPUT'})

     }*/
</script>