var wf={
    //是否为数组
    isArray:function (arr) {
        console.log(Object.prototype.toString.call(123)) //[object Number]
        console.log(Object.prototype.toString.call('123')) //[object String]
        console.log(Object.prototype.toString.call(undefined)) //[object Undefined]
        console.log(Object.prototype.toString.call(true)) //[object Boolean]
        console.log(Object.prototype.toString.call({})) //[object Object]
        console.log(Object.prototype.toString.call([])) //[object Array]
        console.log(Object.prototype.toString.call(function(){})) //[object Function]
        return Object.prototype.toString.call(arr) === "[object Array]"
    }
}
/** 注释
 *
 * @param {Number} tIndex 开始时间
 * @param {Number} c 当前时间
 */