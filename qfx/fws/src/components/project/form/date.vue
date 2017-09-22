<template>
  <div class="typeline">
    <span class="yuandian" style="color: red;" v-show="message.rules[0]" >*</span>
    <span class="leftshouru" style="display: inline-block;">({{index+1}})&nbsp;{{message.title}}</span>
    <p class="beizhu">{{message.describe}}</p>
    <div style="display: inline-block;margin-top:10px;margin-left: 19px;">
      <span class="demonstration">开始时间：</span>
      <el-date-picker v-if="showForm" v-model="date_value1" type="date" placeholder="选择日期时间" @change="dateChange1" :disabled='isDisabled'>
        <!--<el-date-picker v-if="showForm" v-model="date_value1_ji" type="date" placeholder="选择日期时间" @change="dateChange1">-->
      </el-date-picker>
      <span class="beizhu css_color_1b" v-else>
        <!--{{message.answer.date_value1 | formatDate}}-->
        {{message.answer.date_value1 | filterDateUndefined}}
      </span>
    </div>
    <div style="display: inline-block;margin-top:10px;margin-left: 19px;">
      <span class="demonstration">结束时间：</span>
      <!--<el-date-picker v-if="showForm" v-model="message.answer.date_value2" type="date" placeholder="选择日期时间" @change="dateChange2">-->
      <el-date-picker v-if="showForm" v-model="date_value2" type="date" placeholder="选择日期时间" @change="dateChange2" :disabled='isDisabled'>
      </el-date-picker>
      <span class="beizhu css_color_1b" v-else>
        {{message.answer.date_value2 | filterDateUndefined}}
        <!--{{date_value2 | formatDate}}-->
      </span>
    </div>
    <div>{{checkShow}}</div>
  </div>
</template>
<script>
  import {formatDate,currency} from 'assets/js/filter'
  import {mapGetters} from 'vuex'
  export default{
    props:['message','index','fix','hasAnswer'],
    watch:{
      message(old_value,new_value){
      }
    },
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
      if( this.message.answer.date_value1.length>0){
        this.date_value1 = this.message.answer.date_value1;
      }
      if( this.message.answer.date_value2.length>0){
        this.date_value2 = this.message.answer.date_value2;
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
        date_value1:"",
        date_value2:""
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
      date_value1_ji(){
        var item = "";
//        if(!this.isEmpty(this.message) && this.isEmpty(this.message.answer) && this.isEmpty(this.message.answer.date_value1)){
//          item = this.message.answer.date_value1;
//        }
        return item;
      },
      checkShow(){
        this.check = JSON.parse(window.localStorage.getItem('check4'));
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
      isEmpty(item){
        if(item == undefined || item == null){
          return true;
        }else {
          return false;
        }
      },
      reSet(answer){
        if(answer != undefined && answer != null){
          this.date_value1 = answer.date_value1;
          this.date_value2 = answer.date_value2;
        }
      },
      dateChange1(val) {
        this.message.answer.date_value1 = val;
      },
      dateChange2(val) {
        this.message.answer.date_value2 = val;
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
