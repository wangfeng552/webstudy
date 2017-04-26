<template>
  <div>
    <ul>
      <li v-focus="{color:'red',age:'45'}">123</li>
    </ul>
  </div>
</template>
<script>
  export default{
      //注册一个局部自定义指令
      directives:{
          //v-focus
          focus:{
              //当绑定元素在插入DOM之前
              inserted(el,binding,vnode){
//                  console.log(binding)
                  el.style.color=binding.value.color;
                  el.innerHTML=binding.value.age
              }
          }
      }
  }

  /*钩子函数
   * bind		 只调用一次，初始化
   * inserted   绑定元素插入到dom中
   * update
   * componentUpdate
   * unbind
   *
   * 钩子函数参数
   *el 		指令所绑定的元素，可以直接操作DOM
   * binding	一个对象，包含以下属性
   * name			指令名 不包含v-前缀
   * value			指令绑定的值 例如： v-my-directive="1 + 1", value 的值是 2
   * oldValue		指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
   * expression	绑定值的字符串形式。 例如 v-my-directive="1 + 1" ， expression 的值是 "1 + 1"。
   * arg			传给指令的参数。例如 v-my-directive:foo， arg 的值是 "foo"。
   * modifiers		一个包含修饰符的对象。 例如： v-my-directive.foo.bar, 修饰符对象 modifiers 的值是 { foo: true, bar: true }。
   * vnode
   * oldVnode
   * */
</script>