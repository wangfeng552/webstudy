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
