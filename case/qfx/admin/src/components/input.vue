<template>
	<div class="typeline">
		<div>
			<span class="yuandian" style="color: red;" v-show="yuandian">*</span>
			<div class="leftshouru" style="display: inline-block;">
                <span class="serialNumber">({{index+1}})</span>
                <span class="fromtitle">{{message.title}}</span>
            </div>
			<p class="beizhu" v-if="message.describe" v-html="message.describe"></p>
		</div>
		<input type="text" v-model="user.inputValue" class="inputdic">
		<div class="errormessage" v-show="show.error">请输入内容</div>
		<div>{{requiredShow}}</div>
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
        computed:{
            requiredShow(){
            	this.message.rules.forEach((v)=>{
                    if (v == 'required') {
                        this.yuandian = true
                    }else{
                    	this.yuandian = false
                    }           
                })
                this.message.describe = this.message.describe.replace(/(?:\r\n|\r|\n)/g, '<br />'); 
            }
        },
        methods:{
        	
	        
        }
      }
</script>