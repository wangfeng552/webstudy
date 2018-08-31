<template>
	<div class="typeline">
		<div>
			<span class="yuandian" style="color: red;" v-show="message.rules[0]">*</span>
			<div class="leftshouru" style="display: inline-block;">({{index+1}})&nbsp;{{message.title}}</div>
			<p class="beizhu">{{message.describe}}</p>

		</div>
    <div v-if="hasAnswer">
      <div v-if="showForm">
        <label class="am-checkbox" v-for="(item2,index1) in message.value" >
          <input type="checkbox" :value="item2"  v-model="check_value" class="base_checkbox"  @change="changeCheck">
          <span class="fs14">{{item2}}</span>
        </label>
      </div>
        <p class="answer" v-for="item3 in message.answer.check_value" v-else>{{item3}}</p>
    </div>
		<div v-if="hasTicket">
      <div v-if="type=='two'">
      <label class="am-checkbox am-secondary" v-for="(item2,index1) in message.value" >
        <input type="checkbox" :value="item2"  v-model="check_value" class="base_checkbox" @change="changeCheck">
        <span class="fs14">{{item2}}</span>
      </label>
      </div>
        <p class="answer" v-for="item in message.answer.check_value" v-if="type=='three'">{{item}}</p>
    </div>

    <transition name="fade">
      <div class="errormessage" v-show="show.error">请选择内容</div>
    </transition>
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
          showForm(){
              if(this.fix){ //点击修改
                return true;
              }else {
                return false;
              }
          }
        },
        methods:{
          changeCheck(e){
            var index1 = e.target.name;
            this.message.check_value = this.check_value;
            this.showError()
          },
          showError(){
            if (this.message.rules[0] == 'required'){
              var str=this.message.answer.check_value.join('')
              if(str==''){
                this.show.error = true
                this.message.error = true

              }else{
                this.show.error = false
                this.message.error = false

              }
            }

          },
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped="">
</style>
