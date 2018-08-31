<template>
	<div class="typeline">
	    <span class="yuandian" style="color: red;" v-show="message.rules[0]" >*</span>
		<div class="leftshouru" style="display: inline-block;">({{index+1}})&nbsp;{{message.title}}</div>
		<p class="beizhu">{{message.describe}}</p>
    <div v-if="hasAnswer">
      <label class="am-radio" v-for="item2 in message.value" v-if="showForm">
        <input type="radio" :name="index" :value="item2" data-am-ucheck v-model="message.answer.radio_value" class="base_radio"  @click="showError">
        <span class="fs14">{{item2}}</span>
      </label>
      <p class="answer" v-if="fix == false">{{message.answer.radio_value}}</p>
    </div>
		<div v-if="hasTicket">
      <label class="am-radio" v-for="item2 in message.value" v-if="type=='two'">
        <input type="radio" :name="index" :value="item2" data-am-ucheck v-model="message.answer.radio_value" class="base_radio"  @click="showError">
        <span class="fs14">{{item2}}</span>
      </label>
      <p class="answer" v-if="type=='three'">{{message.answer.radio_value}}</p>
    </div>
    <transition name="fade">
      <div class="errormessage" v-show="show.error" >请选择内容</div>
    </transition>
	</div>
</template>
<script>
    export default{
        name: 'radio',
      props:['message','index','fix','hasAnswer','hasTicket','type'],
        data(){
        	return{
        		yuandian:false,
        		check:'',
            show:{
              error:false
            },
        	}
        },
        computed:{
            checkShow(){
                this.check = JSON.parse(window.localStorage.getItem('check5'));
                if (this.check == true) {
                	this.yuandian = true
                }else{
                	this.yuandian = false
                }
            },
          showForm(){
              if(this.fix){ //点击修改
                return true;
              }else {
                return false;
              }
          },
          //名字
          inputName(){
              var name_radio = "myRadio"+this.index;
              return name_radio;
          }
        },
      methods:{
        showError(){
          if (this.message.rules[0] == 'required') {
            if (this.message.answer.radio_value == '') {
              this.show.error = true
              this.message.error = true
            }else{
              this.show.error = false
              this.message.error = false

            }
          }
        }
      }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped="">
</style>
