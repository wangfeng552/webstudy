<template>
	<div class="typeline">
	    <span class="yuandian" style="color: red;" v-show="message.rules[0]=='required'">*</span>
		<div class="leftshouru" style="display: inline-block;">({{index+1}})&nbsp;{{message.title}}</div>
		<p class="beizhu" v-html="message.describe"></p>
		<label class="am-radio am-secondary" v-for="item2 in message.value">
		  <input type="radio" :name="'radio'+index" :value="item2"  v-model="message.answer.radio_value" class="base_radio"
             @click="show.error = false"> {{item2}}
		</label>
    <transition name="fade">
    <div class="errormessage" v-show="show.error" >请选择内容</div>
    </transition>
  </div>
</template>
<script>
    export default{
        name: 'radio',
        props:['message','index'],
        data(){
        	return{
            show:{
              error:false
            },
        		yuandian:false,
        		check:'',
            radioValue:'',
        	}
        },
        methods:{
          showError(){
            if (this.message.rules[0] == 'required') {
                if (this.message.answer.radio_value === '') {
                  this.show.error = true
                  this.message.error = true
                }else{
                  this.show.error = false
                  this.message.error = false

                }
              }
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped="">
</style>
