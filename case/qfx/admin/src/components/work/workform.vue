<!--发送表单-->
<template>
  <div class="work_order order_type_one"  v-if="work.workType == 4">
    <div>
      <span style="float: left">发送表单</span><span style="float: right;margin-right: 10px" @click.stop="deletFile(index)">
                      <!--<img src="../../../assets/images/create/danhang.png">-->
                    </span>
    </div>
    <div><span>选择表单</span></div>
    <div><span>XXX 下面是选择之后 出现的各个表单，待实现</span></div>
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
