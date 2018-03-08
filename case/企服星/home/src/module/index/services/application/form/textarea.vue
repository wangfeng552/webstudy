<template>
	<div class="typeline">
		<span class="yuandian" style="color: red;" v-show="message.rules[0]=='required'">*</span>
		<span class="leftshouru" style="display: inline-block;">({{index+1}})&nbsp;{{message.title}}</span>
		<p class="beizhu" v-html="message.describe"></p>
		<textarea v-model="message.answer.textarea_value" @blur="showError" class="base_textarea">
		</textarea>
    <transition name="fade">
    <div class="errormessage" v-show="show.error" >请输入内容</div>
    </transition>
    <!--<div>{{checkShow}}</div>-->
	</div>
</template>
<script>
    export default{
        name: 'textarea',
        props:['message','index'],
      mounted(){
        if(this.message.value.length>0){
          this.textarea_value = this.message.value;
        }else {
          this.textarea_value = "";
        }
      },
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
            textarea_value:''
        	}
        },
        computed:{
            checkShow(){
//                this.check = JSON.parse(window.localStorage.getItem('check3'));
//                if (this.check == true) {
//                	this.yuandian = true
//                }else{
//                	this.yuandian = false
//                }
            },
//          textarea_value(){
//                if(this.message.answer.textarea_value.length>0){
//                    return this.message.answer.textarea_value;
//                }else {
//                    return "";
//                }
//          }
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
