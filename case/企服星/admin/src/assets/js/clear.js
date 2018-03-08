export default{
  install(Vue,options)
  {
    Vue.prototype.clearParams = function (obj) {
    	var copy = JSON.parse(JSON.stringify(obj))
 		Object.keys(copy).forEach((key) => (copy[key] == null || copy[key] === '' || copy[key] == '省' || copy[key] == '市' || copy[key] == '区') && delete copy[key])
 		return copy
    }
  }
}
