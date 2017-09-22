<template>
  <div>
    <el-form  :model="form" :rules="rules" ref="wf_form_v" label-width="120px">

      <!--自定义验证加红*在el-form-item上加require-->
      <el-form-item label="电话" prop="tel" required="">
        <el-input v-model="form.tel" ></el-input>
      </el-form-item>

      <el-form-item label="删了大富科技" prop="user.name">
        <el-input v-model="form.user.name"></el-input>
      </el-form-item>

      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" icon="search" :on-icon-click="handleIconClick"></el-input>
      </el-form-item>

      <el-form-item label="备注">
        <!--固定高度  :rows="2"
        自适应文本高度 :autosize="{ minRows: 2, maxRows: 4}"-->
        <el-input type="textarea" :rows="2" :autosize="{ minRows: 2, maxRows: 4}" v-model="form.textarea"></el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model="form.canting">
          <el-select v-model="form.ctselect" slot="prepend" placeholder="请选择">
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="search"></el-button>
        </el-input>
      </el-form-item>
      <div>{{form.ctselect}}</div>

      <el-form-item label="地区" prop="leixing">
        <el-select v-model="form.leixing" placeholder="请选择">
          <el-option label="上海" value="1"></el-option>
          <el-option label="北京" value="2"></el-option>
          <el-option label="武汉" value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="duoxuan">
        <!--v-model绑定Array类型的变量即可,label与数组中的元素值相对应-->
        <el-checkbox-group v-model="form.duoxuan" @change="radioChange()">
          <el-checkbox label="没事"></el-checkbox>
          <el-checkbox label="leek"></el-checkbox>
          <el-checkbox label="65646">上海</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item prop="danxuan">
        <!--选中意味着变量的值为相应 Radio label属性的值，label可以是String或者Number-->
        <el-radio-group v-model="form.danxuan" @change="radioChange()">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
          <el-radio label="true">是根深蒂固</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="活动时间" required>
        <el-col :span="11">
          <el-form-item prop="riqi">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.riqi" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="time">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.time" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button @click="submit('wf_form_v')" type="primary">提交</el-button>
        <el-button @click="chongzhi('wf_form_v')">重置</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  export default{
    data(){
      var valid_tel = (rule, value, callBack) => {
        if (value == '123') {
          callBack(new Error('重复了'))
        }
        this.$http.post().then((res) => {
          if (true) {
            callBack(new Error('冲名了'))
          } else {
            callBack()
          }
        })
      }
      return {
        form: {
          tel: '',
          user:{
            name:''
          },
          name: '',
          textarea:'',
          canting:'',
          ctselect:'',
          duoxuan: [],
          danxuan: '',
          leixing: '',
          riqi: ''
        },
        rules: {
          tel: [
//            {required: true, message: "必填", trigger: 'blur'},
            {validator: valid_tel, trigger: 'blur'}
          ],
          'user.name':[{required:true,message:'必填',trigger:'blur'}],
          name: [{required: true, message: "必填", trigger: 'blur'}],
          leixing: [{required: true, message: "必填", trigger: 'change'}],
          duoxuan: [{type: 'array', required: true, message: "必填", trigger: 'change'}],
          danxuan: [{required: true, message: "必填", trigger: 'change'}],
          riqi: [{type: 'date', required: true, message: '请选择日期', trigger: 'change'}]
        }
      }
    },
    methods: {
      submit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('yes')
          } else {
            console.log('error')
          }
        })
      },
      chongzhi(formName){
        this.$refs[formName].resetFields()
      },
      radioChange(){
        console.log('radio')
      },
      handleIconClick(){
        console.log('ico')
      }
    }
  }
</script>

<style>
  /*文本左侧下拉样式*/
  .el-select .el-input {
    width: 110px;
  }
</style>
