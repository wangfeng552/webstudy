<template>
  <div class="typeline">
    <span class="yuandian" style="color: red;" v-show="message.rules[0]">*</span>
    <span class="leftshouru" style="display:inline-block;">({{index+1}})&nbsp;{{message.title}}</span>
    <p class="beizhu">{{message.describe}}</p>
    <div style="display: inline-block;margin-left:19px;margin-top:10px;">
      <span class="demonstration"></span>
      <div v-if="showForm">
        <el-date-picker v-model="time_value" type="date" placeholder="选择日期时间" @change="dateChange1" :disabled='isDisabled'>
          <!--<el-date-picker v-model="message.answer.time_value" type="date" placeholder="选择日期时间" @change="dateChange1">-->
        </el-date-picker>
      </div>
      <span class="beizhu css_color_1b" v-else>{{message.answer.time_value | filterDateUndefined}}</span>
    </div>
    <div>{{checkShow}}</div>
  </div>
</template>
<script>
  import {formatDate,currency} from 'assets/js/filter'
  import {mapGetters} from 'vuex'
  export default{
    props:['message','index','fix','hasAnswer'],
    filters:{
      formatDate(time){
        let date=new Date(time);
        return formatDate(date,'yyyy-MM-dd hh:mm')
      },
      currency(val){
        return currency(val)
      },
      filterDateUndefined(val){
        if(val == undefined || val == null || val == 'undefined') return '';
        else return val;
      }
    },
    mounted(){
      if( this.message.answer.time_value.length>0){
        this.time_value = this.message.answer.time_value;
      }else {
        this.time_value = "";
      }
    },
    data() {
      return {
        yuandian:false,
        check:'',
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
        time_value:""
      }
    },
    computed:{
      ...mapGetters(["stepName","currentProject","hasRoot","currentStage"]),
      // 禁用状态  默认是禁用
      isDisabled(){
        var mark = true;
        if(this.hasAnswer){
          if(this.hasRoot && this.fix && this.isNotComplete && this.canOperation) mark = false;
        }else {// 没有答案
          if(this.hasRoot && this.isNotComplete && this.canOperation) mark = false;
        }
        return mark;
      },
      canOperation(){
        if(this.currentProject.status == 'deny' || this.currentProject.status == 'stop'){
          return false;
        }
        return true;
      },

      //阶段是否完成  ,如果状态是 complete 那么发送按钮是不显示的
      isNotComplete(){
        if(this.currentStage.status == 'complete'){
          return false;
        }else {
          return true;
        }
      },
      checkShow(){
        this.check = JSON.parse(window.localStorage.getItem('check7'));
        if (this.check == true) {
          this.yuandian = true
        }else{
          this.yuandian = false
        }
      },
      showForm(){
        if(this.hasAnswer){ // 有答案
          if(this.fix){ //点击修改
            return true;
          }else {
            return false;
          }
        }else { // 没有答案
          return true;
        }
      }
    },
    methods:{
      dateChange1(val) {
        this.message.answer.time_value = val;
      },
      reSet(answer){
        if(answer != undefined && answer != null){
          this.time_value = answer.time_value;
        }
      },
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped="">
  .typeline{
    margin-top: 20px;
    position: relative;
    .block{
      margin-top: 20px;
    }
    .yuandian{
      position: absolute;
      left: -11px;
    }
    /*.beizhu{*/
    /*font-size: 12px;*/
    /*color: #999;*/
    /*margin:5px 0;*/
    /*text-indent: 20px;*/
    /*}*/
    .upload-demo{
      width: 100%;
      .el-upload{
        width: 100%;
      }
      .el-upload-dragger{
        width: 59%;
        height: 130px;
      }
    }
  }

</style>
