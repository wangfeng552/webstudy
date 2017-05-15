<template>
    <div class="mk">
        <div class="a1">{{name}}</div>
    </div>
</template>
<script>
    // 方法1
    export default{
        computed: {
            name(){
                return this.$store.state.user.name  //相当于getters里面定义的方法，都是获取数据
            }
        }
    }

    // 方法2
    import {mapState} from 'vuex'
    export default{
        computed: mapState({
            name: state => state.user.name
        })
    }

    // 方法3 通常使用这种
    import {mapGetters} from 'vuex'
    export default{
        computed: mapGetters(['name'])
    }

    //刷新页面
    import {mapState} from 'vuex'
    export default{
      ...mapState({
        name:function (state) {
          if(state.name==''){   //如果state里面的值是空
            this.$store.dispatch("getName",'张三')    //这个方法在执行一遍
          }
          return state.name
        }
      })
    }
</script>