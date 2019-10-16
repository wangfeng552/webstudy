<template>
  <div>
    <button @click="show()">提交</button>
  </div>
</template>

<script>
  export default {
    methods:{
      show(){
        this.$message({
          message:'恭喜你，这是一条成功消息',
          type:'error',           //  默认info |  success  |  error |  warning
          showClose: true,        //  可以关闭
          iconClass:'el-icon-edit'//  自定义自定义图标的类名，会覆盖type
        })
      }
    }
  }
</script>

<!--单独引用

单独引入 Message：
import { Message } from 'element-ui';

此时调用方法为 Message(options)。
我们也为每个 type 定义了各自的方法，如 Message.success(options)。
并且可以调用 Message.closeAll() 手动关闭所有实例。

-->
