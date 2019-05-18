<template>
  <div class="pwdpush-box">
    <div class="mk">123123</div>
    <h4 class="enter-password" @click="enterPwd">输入密码</h4>
    <div class="phonenum-show"  :class="pushShow?'':'write-phonenum-1000'">
      <div class="write-phonenum">
        <ul class="write-input clearfix">
          <input type="tel"  ref="input" maxlength="6" class="realInput" v-model="realInput" @keyup="getNum()"  @keydown="delNum()">
          <li v-for="disInput in disInputs">{{disInput.value}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      messagepacket:false,
      packets:[],
      disInputs:[{value:''},{value:''},{value:''},{value:''},{value:''},{value:''}],
      realInput:'',
      pushShow:false
    }
  },
  methods:{
    getNum(){
      for(var i=0;i<this.realInput.length;i++){
        this.disInputs[i].value=this.realInput.charAt(i)
        // 表示字符串中某个位置的数字，即字符在字符串中的下标。
      }
      if(this.realInput.length>5){
        this.pushShow = false;
      }
    },
    delNum(){
      var oEvent = window.event;
      if (oEvent.keyCode == 8) {
        if(this.realInput.length>0){
          this.disInputs[this.realInput.length-1].value=''
        }
      }
    },
    goPay(){
        console.log(this.realInput)
    },
    enterPwd(){
        this.pushShow = true;
        this.$refs.input.focus()
    }
  }
}
</script>
<style lang="less" sconed>
  .enter-password{
    text-align: right;
    color:#1D890D;
    font-size: 18px;
    line-height: 2;
    margin-top:20px;
    padding-right: 20px;
  }
  .phonenum-show{
    background: rgba(0,0,0,0.6);
    position: absolute;
    top:120px;
    right:0;
    bottom:0;
    left:0;
    z-index: -1;
  }
  .write-phonenum-1000{
    top:-1000px!important;
  }
  .write-phonenum{
    position: absolute;
    top:50%;
    margin-top:-100px;
    left:0;
    right:0;
    bottom:0;
    z-index: 2;
    padding:30px 10px 0;
    background: #fff;
  }

  .write-input {width:312px; margin:10px auto; position: relative;}
  .write-input li{float: left;width:30px;height:30px; line-height: 30px; text-align: center; margin: 0 10px; border:1px solid #888888;}
  .realInput{
    /* Keyword values */
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    resize: none;
    outline: none;
    border: 0;
    z-index: 3;
    position: absolute;
    width: 290px;
    height: 30px;
    line-height: 30px;
    background: none;
    display: block;
    left: 50%;
    margin-left: -145px;
    top: 34px;
    opacity: 0;
    font-size: 0px;
    caret-color: #fff;
    color: #000;
    text-indent: -5em;
    font-size: 30px;
    top:1px;
  }
  input[type="tel"]:disabled{background-color: #fff;}
</style>