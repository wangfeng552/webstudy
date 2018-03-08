<!--思路-->
<!--1.将peops 中的 string 分割字符串【日期】，再在分割之后的里面 以【备注】分割，将日期用picked代替，【】备注用 input来代替-->
<!--2.在提交的时候反向操作，先将【备注】input 中的文字全部解析处理，再将【日期】中选择出来的全部解析出来放在字符串中-->
<!--3.需要考虑【日期】字符串分割的准确性， 日期 与 【日期】试验一下-->
<template>
  <div class="textarea_extend">
    <template v-if="this.content_data.length>0">
		<span v-for="(item,index) in content_data">
			<span v-for="(obj,index_ch) in item.children">
				{{obj.str}}
				<input class="base_input" type="text" v-model="obj.input_value" v-if="obj.input" :disabled='isDisabled'>
			</span>
      <!--<input type="date" v-model="item.date_value" v-if="item.date" class="base-input-style" :disabled='isDisabled'>-->
      <span class="span-data">
               <el-date-picker
                 v-model="item.date_value"
                 type="date"
                 v-if="item.date"
                 size="small"
                 :disabled='isDisabled'
                 :editable="false"
                 placeholder="选择日期"
               >
    </el-date-picker>
      </span>

		</span>
    </template>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'textareaExtend',
    props: ['content'],
    data() {
      return {
        date_value: '',
        content_data:[],
      }
    },
    computed: {
      ...mapGetters(["stepName","currentProject","hasRoot","currentStage"]),
      isDisabled(){
        if(this.hasRoot && this.canOperation && this.isNotComplete) return false
        else return true
      },
      canOperation(){
        if(this.currentProject.status == 'deny' || this.currentProject.status == 'stop'){
          return false;
        }
        return true;
      },
      //阶段是否完成  ,如果状态是 complete 那么发送按钮是不显示的
      isNotComplete(){
        if(this.currentStage.status == 'complete'){
          return false;
        }else {
          return true;
        }
      },
    },
    mounted(){
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
          if(index == list_two.length - 1)  obj2.input = false;
          obj5.children.push(obj2);
        })
      });
      this.content_data = list_all;
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
      checkList() {
        //拿到最终的 str
        var str_all = '';
        var mark_error = false;
        var that = this;
        this.content_data.forEach(function(item, index) {
          item.children.forEach(function(item_ch, index_ch) {
            str_all = str_all + item_ch.str;
            if(item_ch.input) {
              str_all = str_all + item_ch.input_value;
              //做验证，必须每一个都要填写
              if(item_ch.input_value.length<1) mark_error = true;
            }
          });
          if(item.date) {
            //做验证，必须每一个都要填写
            if(item.date_value.length<1) mark_error = true;
//            str_all = str_all + item.date_value;
            str_all = str_all + that.formatDateToStrGol(item.date_value);
          }
        });
        var back = {};
        back.mark_error= mark_error;
        back.value= str_all;
        if(mark_error) this.showMessage("warning","请填写信息，不能为空且日期的格式必须正确");
        return back;
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" rel="stylesheet/scss">

  .textarea_extend{
    .el-input{
      margin-bottom: 5px;
    }

  }


</style>

<style lang="scss" rel="stylesheet/scss" scoped>

  .textarea_extend {
    padding: 5px;
    border-radius: 5px;
    min-height: 50px;
    .base_input{
      height:30px;
      line-height:30px;
      margin-right:10px;
      text-indent:10px;
      border:1px solid #ccc;
      border-radius:3px;
      width: 580px;
      margin-bottom: 5px;
      margin-top: 5px;
      /*position: relative;*/
      /*top:5px;*/
      display: inline-block;
    }
    span{
      font-size:14px;
      color:#666666;
      min-height: 30px;
      /*display: inline-block;*/
    }
    .span-data{
      /*display: inline-block;*/
      /*margin-top: 5px;*/
      /*margin-bottom: 5px;*/
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
    margin-bottom: 10px;
    min-width: 150px;
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
