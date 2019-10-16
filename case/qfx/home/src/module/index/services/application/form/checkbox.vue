<template>
  <div class="typeline">
    <div>
      <span class="yuandian" style="color: red;" v-show="message.rules[0]=='required'">*</span>
      <div class="leftshouru" style="display: inline-block;">({{index+1}})&nbsp;{{message.title}}</div>
      <p class="beizhu" v-html="message.describe"></p>

    </div>
    <label class="am-checkbox am-secondary" v-for="(item2,index1) in message.value">
      <input type="checkbox" :value="item2" data-am-ucheck :name="index1" @change="changeCheck"
             v-model="message.answer.check_value" class="base_checkbox"> {{item2}}
    </label>
    <!--<p v-if="fix == false" class="beizhu" v-else>{{message.answer.check_value}}</p>-->
    <transition name="fade">
    <div class="errormessage" v-show="show.error">请选择内容</div>
    </transition>
    <div>{{checkShow}}</div>
  </div>
</template>
<script>
  export default{
    props: ['message', 'index'],
    data(){
      return {
        show: {
          error: false
        },
        user: {
          checked: ''
        },
        yuandian: false,
        check_value: []
      }
    },
    watch: {
      check_value(curVal, oldVal){
        console.log(curVal, oldVal);
        this.message.check_value = curVal;

      }
    },
    mounted(){
      var item = [];
      if (this.message.check_value != undefined && this.message.check_value.length > 0) {
        this.message.check_value.forEach(function (obj, index) {
          item.push(obj);
        })
      } else {

      }
      this.check_value = item;
    },
    computed: {
      checkShow(){
        this.check = JSON.parse(window.localStorage.getItem('check4'));
        if (this.check == true) {
          this.yuandian = true
        } else {
          this.yuandian = false
        }
      }
    },
    methods: {
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
      changeCheck(e){
        var index1 = e.target.name;
        this.message.check_value = this.check_value;
        this.showError()
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped="">
</style>
