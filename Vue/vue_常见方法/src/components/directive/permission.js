import store from '@/store'

function checkPermission(el, binding) {
  const { value } = binding
  const btnArr = ['1', '2', '1001', '3']

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionBtn = value.toString()
      const hasPermission = btnArr.includes(permissionBtn)
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['1001']"`)
  }
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}

/*钩子函数
 * bind		    只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
 * inserted   被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
 * update     所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有
 * componentUpdate 令所在组件的 VNode 及其子 VNode 全部更新后调用。
 * unbind     只调用一次，指令与元素解绑时调用。

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
