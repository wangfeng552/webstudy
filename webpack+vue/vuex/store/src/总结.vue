<script>
//    方法1，可传参数
    this.$store.state.name //取数据
    this.$store.commit("mutationname",val)//传参提交至mutation处理
    this.$store.dispatch("actionname",val)//传参至actions处理


//    方法2，不能传参数

//获取数据
import {mapState} from "vuex"
export default{
    computed:mapState({
        name:state=>state.name,
        age:state=>state.age
    })
}
//获取数据
import {mapGetters} from "vuex"
export default{
    computed:mapGetters(['name']) /*必须设置getters:{ name: state=>state.name }*/
}

//处理数据
import {mapActions} from "vuex"
export default{
    methods:mapActions({methodName:"actionName"}),
    action:{
        actionName({commit},val){       //可以传参数
            commit("mutationName",val)
        }
    }
}


//保存数据库
import {mapMutations} from "vuex"
export default{
    methods:mapMutations({methodsName:"MUTATION_NAME"}),
    mutations:{
        MUTATION_NAME(state,val){
            state.name=parseInt(val)
        }
    }
}
</script>