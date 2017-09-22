export default{
  install(Vue,options)
  {
    Vue.prototype.clearParams = function (obj) {
      var copy = JSON.parse(JSON.stringify(obj))
      Object.keys(copy).forEach((key) => (copy[key] == null || copy[key] == '' || copy[key] == '省' || copy[key] == '市' || copy[key] == '区') && delete copy[key])
      return copy
    },
    Vue.prototype.cloneObjGol = function (obj) {
      var obj1={};
      obj1=JSON.parse(JSON.stringify(obj));
      return obj1
    },
    //判断是否为空
    Vue.prototype.isEmptyGol = function (item) {
      if(item == undefined || item == null) return true;
      else return false;
    }
  }
}
