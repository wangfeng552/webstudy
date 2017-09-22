<template>
	<div class="typeline">
		<div>
			<span class="leftshouru">({{index+1}})&nbsp;{{message.title}}</span>
			<p class="beizhu">{{message.describe}}</p>
		</div>
		<input type="text" v-model="user.inputValue" @blur="input_blur" class="inputdic">
		<div class="errormessage" v-show="show.error">请输入内容</div>
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
	        	}
        	}
        },
        methods:{
        	input_blur(){
	        	if (this.message.rules == 'required') {
	        		if (this.user.inputValue !== '') {
	        			this.show.error = false
	        		}else{
	        			this.show.error = true
	        		}
	        	}
	        }
        }
      }
</script>