<template>
	<div class="typeline">
		<div>
			<span class="yuandian" style="color: red;" v-show="message.rules[0]">*</span>
			<div class="leftshouru" style="display: inline-block;">({{index+1}})&nbsp;{{message.title}}</div>
			<p class="beizhu">{{message.describe}}</p>

		</div>
    <div v-if="hasAnswer">
        <div v-for="item3 in message.answer.check_value">
        <span class="beizhu">{{item3}}</span>
        </div>
    </div>
		<div v-if="hasTicket">
      <div v-for="item in message.answer.check_value">
        <span class="beizhu">{{item}}</span>
      </div>
    </div>
	</div>
</template>
<script>
    export default{
      props:['message','index','fix','hasAnswer','hasTicket','type'],
        data(){
        	return{
        		show:{
        			process:false,
              error: false
	        	},
	        	user:{
	        		checked:''
	        	},
	        	yuandian:false,
                check_value:[]
        	}
        },
        watch:{
            check_value(curVal,oldVal){
                this.message.answer.check_value = curVal;

            }
        },
        mounted(){
            var item = [];
            if(this.message.answer.check_value != undefined && this.message.answer.check_value.length>0){
                this.message.answer.check_value.forEach(function (obj,index) {
                    item.push(obj);
                })
            }else {

            }
            this.check_value = item;
        },
        computed:{
            checkShow(){
            	this.check = JSON.parse(window.localStorage.getItem('check4'));
                if (this.check == true) {
                	this.yuandian = true
                }else{
                	this.yuandian = false
                }
            },
        },
        methods:{
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped="">
</style>
