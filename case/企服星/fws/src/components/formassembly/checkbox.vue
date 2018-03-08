<template>
	<div class="typeline">
		<div>
			<div class="leftshouru">({{index+1}})&nbsp;{{message.title}}</div>
			<p class="beizhu">{{message.describe}}</p>
		</div>
		<label class="am-checkbox am-secondary" v-for="item2 in message.value">
		  <input type="checkbox" value="" data-am-ucheck name="process"> {{item2}}
		</label>
		<div class="errormessage" v-show="show.process">请输入内容</div>
	</div>
</template>
<script>
    export default{
        props:['message','index'],
        data(){
        	return{
        		show:{
        			process:false
	        	},
	        	user:{
	        		checked:''
	        	}
        	}
        },
        methods:{
        	input_blur(){
	        	if (this.message.rules == 'required') {
	        		if ($('input:checkbox[name=process]:checked').length == 0) {
	        			this.show.process = true
	        		}else{
	        			this.show.process = false
	        		}
	        	}
	        }
        }
    }
</script>