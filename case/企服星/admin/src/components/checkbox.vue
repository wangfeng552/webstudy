<template>
	<div class="typeline">
		<div>
			<span class="yuandian" style="color: red;" v-show="yuandian">*</span>
			<div class="leftshouru" style="display: inline-block;">
                <span class="serialNumber">({{index+1}})</span>
                <span class="fromtitle">{{message.title}}</span>
            </div>
			<p class="beizhu" v-html="message.describe"></p>
		</div>
		<label class="am-checkbox am-secondary" v-for="item2 in message.value" style="margin:0 0 10px 10px;">
		  <input type="checkbox" value="" data-am-ucheck name="process"> {{item2}}
		</label>
		<div class="errormessage" v-show="show.process">请输入内容</div>
		<div>{{requiredShow}}</div>
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
	        	},
	        	yuandian:false,
        		check:'',
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