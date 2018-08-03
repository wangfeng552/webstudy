import Vue from "vue"
const directive = {
  inserted: (el, { value: [min = -1e8, max = 1e8, fixed = 8] }) => {
    if (!/input/i.test(el.tagName)) {
      return
    }
    el.addEventListener("keydown", e => {
      const keyCode = e.keyCode ? e.keyCode : e.which
      if (el.value) {
        if (keyCode > 47 && keyCode < 58) {
          if (fixedNumber(el.value) >= fixed || el.value > max) {
            return e.preventDefault()
          }
        }
      }
    })
  }
}

const fixedNumber = function(value) {
  value = String(value)
  if (value.indexOf(".") < 0) {
    return 0
  }
  console.log(value)
  return value.split(".")[1].length
}

Vue.directive("range", directive)
