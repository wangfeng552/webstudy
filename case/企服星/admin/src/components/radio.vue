<template>
	<div class="typeline">
	    <span class="yuandian" style="color: red;" v-show="yuandian">*</span>
		<div class="leftshouru" style="display: inline-block;">
            <span class="serialNumber">({{index+1}})</span>
            <span class="fromtitle">{{message.title}}</span>
        </div>
		<p class="beizhu" v-html="message.describe"></p>
		<label class="am-radio am-secondary" v-for="item2 in message.value" style="margin: 0 0 10px 10px;">
		  <input type="radio" name="radio3" value="" data-am-ucheck> {{item2}}
		</label>
		<div>{{requiredShow}}</div>
	</div>
</template>
<script>
    export default{
        name: 'radio',
        props:['message','index'],
        data(){
        	return{
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
        }
    }
</script>