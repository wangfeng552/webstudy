<template>
  <div>
    <button  @click="show()">消息提示</button>
    <button  @click="btnsure()">确认信息</button>
    <button  @click="btncontext()">提交内容</button>
  </div>
</template>

<script>

  export default {
    data(){
      return {
      }
    },
    methods:{
      show(){
        this.$alert('确定要删除吗？','提示',{
          confirmButtonText:'考虑好了',
          callback:(action)=>{
            this.$message({
              message:`action: ${ action }`,
              type:'success'
            })
          }
        })
      },
      // 确认信息
      btnsure(){
        //第二个参数必须为字符串
        this.$confirm('啥地方卡萨撒地方','提示',{
          confirmButtonText:'提交',
          cancelButtonText:'删除',
          showCancelButton:false,     //是否显示取消按钮
          type:'success'              //默认info |  success  |  error |  warning
        }).then().catch()
      },
      // 提交内容
      btncontext(){
        this.$prompt('请输入邮箱','提示',{
          inputPattern:/^[0-9]{2,3}$/,         // 正则
          inputValidator:()=>{},               // 返回布尔值或字符串; 若返回一个字符串, 则返回结果会被赋值给 inputErrorMessage
          inputErrorMessage:'邮箱格式错误',     // 报错信息
          inputPlaceholder:'请输入邮箱',        // 占位符
          inputValue:'312467734'               // 初始值

        })
      }
    }
  }
</script>
