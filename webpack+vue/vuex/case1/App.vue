<template>
    <div class="mk">
        <ul>
            <li>{{author}}</li>
            <input type="text" v-model="newText">
            <button @click="changeText">点击</button>
        </ul>
    </div>
</template>
<script>
export default{
    data(){
        return {newText:""}
    },
    computed:{
        author(){
            return this.$store.state.author     //在 Vue 组件中获得 Vuex 状态
        },
    },
    methods:{
        changeText(){
//            this.$store.state.author=this.newText
            this.$store.commit('newAuthor',this.newText)
            //这里使用 $store.commit 提交 newAuthor，并将 this.newText 传给 msg，从而修改 author
        }
    }
}
</script>