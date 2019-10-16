<template>
    <div class="mk">{{mk}}</div>
</template>

<script>
    export default {
        created() {
//            Vue.set( target, key, value )
            this.$set(this.mk, 'name', '藏十多年')
//            Vue.delete( target, key )
            this.$delete(this.mk,'name')
        },
        data() {
            return {
                mk: {
                    name: '小店'
                }
            }
        }
    }
</script>
