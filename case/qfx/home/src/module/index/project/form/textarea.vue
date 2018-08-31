<template>
	<div class="typeline">
		<span class="yuandian" style="color: red;" v-show="message.rules[0]">*</span>
		<span class="leftshouru" style="display: inline-block;">({{index+1}})&nbsp;{{message.title}}</span>
		<p class="beizhu">{{message.describe}}</p>
    <div v-if="hasAnswer">
      <textarea v-model="message.answer.textarea_value" @blur="showError" class="base_textarea" v-if="showForm">
		</textarea>
      <p class="answer" v-else v-for="v in textarea_value">{{v}}</p>
    </div>
    <div v-if="hasTicket">
       <textarea v-model="message.answer.textarea_value" @blur="showError" class="base_textarea" v-if="type=='two'">
		</textarea>
      <p class="answer" v-if="type=='three'" v-for="v in textarea_value">{{v}}</p>
    </div>
    <transition name="fade">
      <div class="errormessage" v-show="show.error">请输入内容</div>
    </transition>
	</div>
</template>
<script>
    export default{
        name: 'textarea',
      props:['message','index','fix','hasAnswer','type','hasTicket'],
        data(){
        	return{
        		show:{
        			error:false
	        	},
	        	user:{
	        		inputValue:''
	        	},
	        	yuandian:false,
        		check:'',
        	}
        },
        computed:{
            checkShow(){
                this.check = JSON.parse(window.localStorage.getItem('check3'));
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
          textarea_value(){
                if(this.message.answer.textarea_value.length>0){
                	  var str = this.message.answer.textarea_value.split('\n')
                    return str;
                }else {
                    return "";
                }
          }
        },
        methods:{
          showError(){
            if (this.message.rules[0] == 'required') {
              if (this.message.answer.textarea_value == '') {
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
