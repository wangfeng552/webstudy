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
                this.$store.dispatch("action2", "12")
                // 排错
                /*try{
                 this.$store.dispatch('action2',this.newText)
                 } catch(error){
                 alert(error)
                 }*/
            }
        }
    }

    //    方法2 mapActions
    import {mapActions} from "vuex"
    export default{
        computed: mapGetters(["name"]),
        methods: mapActions({"changeName": "action1"})
    }
</script>