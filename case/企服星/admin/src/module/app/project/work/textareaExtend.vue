<!--思路-->
<!--1.将peops 中的 string 分割字符串【日期】，再在分割之后的里面 以【备注】分割，将日期用picked代替，【】备注用 input来代替-->
<!--2.在提交的时候反向操作，先将【备注】input 中的文字全部解析处理，再将【日期】中选择出来的全部解析出来放在字符串中-->
<!--3.需要考虑【日期】字符串分割的准确性， 日期 与 【日期】试验一下-->
<template>

  <div class="textarea_extend">
		<span v-for="(item,index) in content_ji">
			<span v-for="(obj,index_ch) in item.children">
				{{obj.str}}
				<input class="base_input" type="text" v-model="obj.input_value" v-if="obj.input">
			</span>
      <!--{{item.str}}-->
		   <input type="date" v-model="item.date_value" v-if="item.date" class="base-input-style">
      <!--<el-date-picker
                        v-if="item.date"
        v-model="date_value"
        type="date"
        placeholder="选择日期"
        >
      </el-date-picker>-->
		</span>
    <!--<p @click="checkList">点击我查看</p>-->

    <!--<div :class="">-->
      <!--测试div class 的绑定传入参数-->
    <!--</div>-->
  </div>

</template>

<script>
  export default {
    name: 'textareaExtend',
    props: ['content'],
    data() {
      return {
        date_value: ''
      }
    },
    computed: {
      content_ji() {
        var item = this.content;
        // 分割字符串

        var list_all = [];
        var list_one = new Array(); //定义一数组
        list_one = item.split("[日期]"); //字符分割
        list_one.forEach(function(obj, index) {
          var obj2 = {};
          obj2.str = obj;
          obj2.children = [];
          obj2.date = true;
          if(index == list_one.length - 1) {
            obj2.date = false;
          }
          obj2.date_value = '';
          list_all.push(obj2);
        });
        //下面看【备注】
        list_all.forEach(function(obj5, index) {
          var str_next = obj5.str;
          //分割 【备注】
          var list_two = new Array(); //定义一数组
          list_two = str_next.split("[备注]"); //字符分割

          list_two.forEach(function(obj_str, index) {
            var obj2 = {};
            obj2.str = obj_str;
            obj2.children = [];
            obj2.input = true;
            obj2.input_value = "";
            if(index == list_two.length - 1) {
              obj2.input = false;
            }
            obj5.children.push(obj2);
          })
        });
//        console.log(list_all);
        return list_all;
      }
    },
    methods: {
      // 提示框 总汇
      showMessage(type,str){
        if(type == null || type == undefined || type.length<1){
          this.$message(str);
        }else {
          if(type == "success"){
            this.$message({
              message: str,
              type: 'success'
            });
          }else if(type == "warning"){
            this.$message({
              message: str,
              type: 'warning'
            });
          }else if(type == "error"){
            this.$message.error(str);
          }else {
            this.$message(str);
          }
        }
      },
      eventEmit: function() {
        //注意此处的 eventEmit 不能错，参数也可传过去
//        this.$emit('eventEmit', 'message:这句话是通过$emit 传值过去的位置listOne');
      },
      checkList() {
//        console.log(this.content_ji);
        //拿到最终的 str
        var str_all = '';
        var mark_error = false;
        this.content_ji.forEach(function(item, index) {
          item.children.forEach(function(item_ch, index_ch) {
            str_all = str_all + item_ch.str;
            if(item_ch.input) {
              str_all = str_all + item_ch.input_value;
              //做验证，必须每一个都要填写
              if(item_ch.input_value.length<1){
                mark_error = true;
              }
            }
          });
          if(item.date) {
            str_all = str_all + item.date_value;
            //做验证，必须每一个都要填写
            if(item.date_value.length<1){
              mark_error = true;
            }
          }
        });
        var back = {};
        back.mark_error= mark_error;
        back.value= str_all;
        if(mark_error){
          this.showMessage("warning","请填写信息，不能为空");
        }
        return back;
//        console.log(str_all);
      }
    },
    mounted: function() {

    },
    created: function() {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>

  .textarea_extend {
    margin-left: 70px;
    padding: 5px;
    border-radius: 5px;
    min-height: 150px;

    .base_input{
      height:30px;
      line-height:30px;
      margin-right:10px;
      text-indent:10px;
      border:1px solid #ccc;
      border-radius:3px;
    }

    span{
      font-family:MicrosoftYaHei;
      font-size:14px;
      color:#666666;
    }
  }

  //全局输入框和选择框样式
  .base-input-style {
    margin-right:10px;
    font-family: "Microsoft Yahei",Regular, "Helvetica Neue", Helvetica, sans-serif;;
    font-size: 13px;
    outline: none;
    border: 1px solid #cccccc;
    border-radius: 4px;
    min-height: 30px;
    text-indent: 10px;
    //box-shadow: inset 0px 0px 1px @inputBorderColor
    &.date {
      background: url("http://static.bokao2o.com/images/admin/trade_time.png") no-repeat 150px center;
      cursor: pointer;
    }
    &.disabled {
      color:#7f7f7f;
      background-color: #e5e5e5;
    }
    &.enabled {
      color:rgb(51, 51, 51);
      background-color: #ffffff;
    }
  }

</style>
