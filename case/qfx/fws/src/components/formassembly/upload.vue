<template>
	<div class="typeline">
		<span class="leftshouru">({{index+1}})&nbsp;{{message.title}}</span>
		<p class="beizhu">{{message.describe}}</p>
		<el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
		  <i class="el-icon-upload"></i>
		  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
		  <div class="el-upload__tip" slot="tip">{{fileSupportFormatGol}}</div>
		</el-upload>
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
