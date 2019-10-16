<template>
	<div class="typeline">
	    <span class="yuandian" style="color: red;" v-show="message.rules[0]" >*</span>
		<div class="leftshouru" style="display: inline-block;">({{index+1}})&nbsp;{{message.title}}</div>
		<p class="beizhu">{{message.describe}}</p>
    <div v-if="hasAnswer">
      <p class="beizhu">{{message.answer.radio_value}}</p>
    </div>
		<div v-if="hasTicket">
      <p class="beizhu">{{message.answer.radio_value}}</p>
    </div>
	</div>
</template>
<script>
    export default{
        name: 'radio',
      props:['message','index','fix','hasAnswer','hasTicket','type'],
        data(){
        	return{
        		yuandian:false,
        		check:'',
            show:{
              error:false
            },
        	}
        },
        computed:{
            checkShow(){
                this.check = JSON.parse(window.localStorage.getItem('check5'));
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
          },
          //名字
          inputName(){
              var name_radio = "myRadio"+this.index;
              return name_radio;
          }
        },
      methods:{
        showError(){
          if (this.message.rules[0] == 'required') {
            if (this.message.answer.radio_value == '') {
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
