<template>
    <div>
        {{$route.params}}
    </div>
</template>
<script>

    export default {
        created() {

//     this.$router 访问路由器
            this.$router.push()
            this.$router.go(-1)

//     this.$route 访问当前路由
            this.$route// 路由参数
        },
        watch:{
            '$route' (to, from) {
                // 对路由变化作出响应...
            }
        },
//        或者
        beforeRouteUpdate (to, from, next) {
            // react to route changes...
            // don't forget to call next()
        }
    }
</script>

<!--
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})-->
