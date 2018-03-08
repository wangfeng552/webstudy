<template>
	<div class="typeline">
		<span class="yuandian" style="color: red;" v-show="yuandian">*</span>
		<div class="leftshouru" style="display: inline-block;">
            <span class="serialNumber">({{index+1}})</span>
            <span class="fromtitle">{{message.title}}</span>
        </div>
		<p class="beizhu" v-html="message.describe"></p>
        <div class="bigbox">
            <p>单个文件大小不能超过20MB支持jpg、png、txt、doc、docx、xls、xlsx、ppt、pptx、pdf</p>
            <div class="anniu2">上传文件</div>
        </div>
		<div>{{requiredShow}}</div>
	</div>
</template>
<script>
    export default{
        name: 'textarea',
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