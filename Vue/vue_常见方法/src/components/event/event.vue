<template>
    <div>
        <button @click="say('name',$event)">dianji</button>
        <input type="number" @mousewheel.prevent>
    </div>
</template>

<script>
    export default {
        methods:{
            say(a,event){
                event.preventDefault();
                event.target.innerHTML;
            }
        }
    }
</script>

<style scoped>

</style>