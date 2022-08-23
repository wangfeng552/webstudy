/*拷贝缓冲区
* buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
* targetBuffer - 要拷贝的 Buffer 对象。
* targetStart - 数字, 可选, 默认: 0
* sourceStart - 数字, 可选, 默认: 0
* sourceEnd - 数字, 可选, 默认: buffer.length
* */
var buf1 = Buffer.from('abcdefghijkl');
var buf2 = Buffer.from('RUNOOB');
//将 buf2 插入到 buf1 指定位置上
buf2.copy(buf1,2);
console.log(buf1.toString()) //abRUNOOBijkl


/*缓冲区裁剪
* buf.slice([start[,end]])
* start - 数字, 可选, 默认: 0
* end - 数字, 可选, 默认: buffer.length
* 返回一个新的缓冲区，它和旧缓冲区指向同一块内存，但是从索引 start 到 end 的位置剪切。
* */

var hc1=Buffer.from('runoob');
var hc2 = hc1.slice(0,2);
console.log(hc2.toString())  // ru


/*缓冲区长度
* buf.length*/
console.log(hc2.length)  // 2