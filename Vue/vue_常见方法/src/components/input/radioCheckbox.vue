<template>
  <div class="ceshi">
    <el-form :model="form" ref="wf_form_v" label-width="120px" :rules="rules">
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
      <el-form-item v-if="form.danxuan=='reject'">
        <el-form-item label="活动区域" prop="region">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('wf_form_v')">立即创建</el-button>
      </el-form-item>

    </el-form>
    <div>{{mk}}</div>
  </div>
</template>

<script>
  export default{
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
        },
        rules: {
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
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
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<style>

</style>
