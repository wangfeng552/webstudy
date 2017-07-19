<template>
 <div class="ceshi">
   <el-form :model="form" ref="wf_form_v" label-width="120px">

     <el-form-item prop="duoxuan">
       <!--v-model绑定Array类型的变量即可,label与数组中的元素值相对应-->
       <el-checkbox-group v-model="form.duoxuan">
         <el-checkbox :label="v.id" v-for="v in mk" :key="v.id" :disabled="v.isTrue">{{v.name}}</el-checkbox>
       </el-checkbox-group>
     </el-form-item>

     <el-form-item prop="danxuan">
       <el-radio-group v-model="form.danxuan" @change="radioChange()">
         <el-radio label="pass">通过</el-radio>
         <el-radio label="reject">拒绝</el-radio>
       </el-radio-group>
     </el-form-item>

   </el-form>

   <div>{{mk}}</div>
 </div>
</template>

<script>
export default {
  data(){
    return {
      mk:[
        {id: 1,name:'safsaf',isTrue:true},
        {id: 2,name:'单方事故',isTrue:true},
        {id: 3,name:'的双方各了',isTrue:true},
      ],
      form:{
        danxuan:'pass',
        duoxuan:[]
      }
    }
  },
  methods:{
    radioChange(){
      if(this.form.danxuan=='pass'){
        this.mk.forEach((v)=>{
          v.isTrue = true;
        })
        this.form.duoxuan = []

      }else if(this.form.danxuan=='reject'){
        this.mk.forEach((v)=>{
          v.isTrue = false;
        })
      }

    }
  },
  beforeRouteLeave (to, from, next) {
    console.log(to);
    console.log(from);
    next()
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
</script>
<style lang="scss">
</style>
