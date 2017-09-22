<template>
	<div class="form-apply">
		<div class="typeline">
			<div>
				<span class="yuandian" style="color: red;" v-show="message.rules[0]=='required'">*</span>
				<span class="leftshouru" style="display: inline-block;">({{index+1}})&nbsp;{{message.title}}</span>
				<p class="beizhu" v-html="message.describe"></p>
			</div>
			<input type="text" v-model="message.answer.input_value" @blur="showError" class="inputdic base_input">
      <transition name="fade">
			<div class="errormessage" v-show="show.error" >请输入内容</div>
      </transition>
		</div>
	</div>
</template>
<script>
    export default{
        props:['message','index'],
        data(){
        	return{
        		show:{
        			error:false
	        	},
	        	user:{
	        		inputValue:''
	        	},
	        	yuandian:false,
	        	check:''
        	}
        },
        methods:{
          showError(){
	        	if (this.message.rules[0] == 'required') {
	        		if (this.message.answer.input_value == '') {
	        			this.show.error = true
                this.message.error = true
	        		}else{
	        			this.show.error = false
                this.message.error = false
              }
	        	}
	        }
        },
      }
</script>
<!--全局的 -->
<style lang="scss" rel="stylesheet/scss">


</style>

