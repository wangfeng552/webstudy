<!--确认文件-->
<template>
  <div class="work_order order_type_one"  v-if="work.workType == 5">
    <div>
      <span style="float: left">文件确认</span><span style="float: right;margin-right: 10px" @click.stop="deletFile(index)">
                      <!--<img src="../../../assets/images/create/danhang.png">-->
                    </span>
    </div>
    <div><span>*标题</span><span style="width: 70%"><input type="text" style="width: 100%"></span></div>
    <div style="height: auto"><span>内容</span> <span style="width: 70%"><textarea style="width: 100%">多行内容</textarea></span></div>
  </div>
</template>
<script>
  export default{
    name:'chartcheckbox',
    props:['message', 'parent', 'index'],
    data: function() {
      return {

      }
    },
    methods:{
      // 删除当前项
      delLastOne(){
        this.parent.splice(this.index, 1)
        window.localStorage.setItem('items', JSON.stringify(this.parent))
      },
      // 增加选项值
      addoption(){
        this.message.value.push("选项值")
      },
      // 删除选项值
      deloption(index){
        this.message.value.splice(index, 1)
      },
      // 必填往items里增加required
      addGuize(){
        if (this.checked == true) {
          this.message.rules.push('required')
        }else{
          this.message.rules.splice('required')
        }
      }
    }
  }
</script>
