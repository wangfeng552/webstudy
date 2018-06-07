<template>
  <span class="countdown" >
    <b v-show="showDay !='00'" :class="{active:timeStyle}">{{showDay}}</b><i v-show="showDay !='00'">:</i><b :class="{active:timeStyle}">{{showHour}}</b><i>:</i><b :class="{active:timeStyle}">{{showMinute}}</b><i>:</i><b :class="{active:timeStyle}">{{showSecond}}</b>
  </span>
</template>

<script>
  import {getServerDate} from '../assets/js/common';
  export default {
    name: "count-down",
    props:{
      endTime:{
        type:Number,
        required:true
      },
      position:{
        type:Number,
        default:0,
        required:false
      },
      timeStyle:{
        type:Boolean,
        default:false,
        required:false
      }
    },
    data(){
      return {
        showTime:'00:00:00',
        showDay:'00',
        showHour:'00',
        showMinute:'00',
        showSecond:'00',
        startTime:0
      }
    },
    created(){
      // if(!this.endTime.isStatus){
      //   this.$set(this.endTime,'isStatus',true)
      // }else{
      //
      // }
      getServerDate((res)=>{
        this.countDown(res.getTime(),this.endTime)

      })
    },
    mounted(){

    },
    computed:{

    },
    methods:{
      //时间为0是，通知父组件
      inform(val){
            this.$emit('listenToChildEvent',{isStatus:true,position:this.position})

      },
      countDown(currentTime,endTime){
        var _this = this;
        var timeStart = currentTime; // 当前时间
        var timeEnd = endTime;
        var remainTime=(timeEnd-timeStart)/1000,
          d=0,h=0,m=0,s=0;

        var timer = setInterval(function () {
          if(remainTime<=0){
            _this.showTime = '00:00:00';
            _this.showHour = '00';
            _this.showMinute = '00';
            _this.showSecond = '00';
            clearInterval(timer)
            _this.inform()
          }else{
            remainTime--;
            d = ~~(remainTime / 86400);
            h = (~~(remainTime % 86400 / 3600)) < 10 ? '0' + (~~(remainTime % 86400 / 3600)) : ~~(remainTime % 86400 / 3600);
            m = (~~(remainTime % 86400 % 3600 / 60)) < 10 ? '0' + (~~(remainTime % 86400 % 3600 / 60)) : ~~(remainTime % 86400 % 3600 / 60);
            s = (~~(remainTime % 86400 % 3600 % 60)) < 10 ? '0' + (~~(remainTime % 86400 % 3600 % 60)) : ~~(remainTime % 86400 % 3600 % 60);
            if(d<=0){
              _this.showTime =h+':'+m+':'+s;
              _this.showHour = h;
              _this.showMinute = m;
              _this.showSecond = s;
            }else{
              _this.showTime =d+'D'+':'+h+':'+m+':'+s;
              _this.showDay =d+'D';
              _this.showTime =h+':'+m+':'+s;
              _this.showHour = h;
              _this.showMinute = m;
              _this.showSecond = s;
            }
          }
        },1000)

      }
    }
  }
</script>

<style lang="scss"scoped>
  .countdown{
    font-size:.28rem;
    color:#666;
    i{
      display:inline-block;
      width:.15rem;
      text-align: center;
    }
    b{

    }
    .active{
      display: inline-block;
      width:.56rem;
      line-height:.48rem;
      text-align:center;
      color:#fff;
      background:#333;
      margin-right:.01rem;
      border-radius:.05rem;
    }
  }
</style>