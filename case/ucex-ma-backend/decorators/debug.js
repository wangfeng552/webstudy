// const d = require('debug')
export function debug(module) {
  const log = console.log
  return function(target, name, descriptor) {
    const original = descriptor.value
    if (typeof original === "function") {
      descriptor.value = function(...args) {
        try {
          const result = original.apply(this, args)
          log(`Result: ${result}`)
          return result
        } catch (e) {
          log(`Error: ${e}`)
          throw e
        }
      }
    }
    return descriptor
  }
}
