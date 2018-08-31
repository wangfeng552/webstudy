/*写入缓冲区
* buf.write(string[,offset[,length]][,encoding])
* string 写入缓冲区的字符串
* offset 缓冲区开始写入的索引值，默认为0
* length 写入的字节数，默认为buffer.length
* encoding 使用的编码,默认'utf8'
* */

var buf = Buffer.alloc(256);
var len = buf.write('www.runoob.com')
// console.log(buf)
// console.log('写入字节数'+len) //=>写入字节数 : 14


/*读取缓冲区数据
* buf.toString([encoding[,start[,end]]])
* encoding 使用的编码，默认'utf8'
* start 指定开始读取的索引位置，默认为0
* end   结束位置，默认为缓冲区的末尾
* 返回值
* 解码缓冲区数据并使用指定的编码返回字符串
* */

var mk= Buffer.alloc(26);
for(var i=0;i<26;i++){
    mk[i]=i+97;
}
console.log( mk.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log( mk.toString('ascii',0,5));   // 输出: abcde
console.log( mk.toString('utf8',0,5));    // 输出: abcde
console.log( mk.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde


/*将buffer转换为JSON 对象
* buf.toJSON()
* 当字符串化一个 Buffer 实例时，JSON.stringify() 会隐式地调用该 toJSON()。
* */

const buf1= Buffer.from([0x1,0x2,0x3,0x4,0x5]);
const json = JSON.stringify(buf1);

//{"type":"Buffer","data":[1,2,3,4,5]}
console.log(json)

const copy = JSON.parse(json,(i,v)=>{
    console.log(v+' wangf')
    return v && v.type=== 'Buffer'? Buffer.from(v.data):v
})
console.log(copy)


/*缓冲区合并‘
* buffer.concat(list[,totalLength])
* list 用于合并的buffer对象数组列表
* totalLength 指定合并后buffer对象的总长度
* */

var buffer1 = Buffer.from('菜鸟教程');
var buffer2 = Buffer.from('www.abidu.com');
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log(buffer3.toString())  //=> 菜鸟教程www.abidu.com


/*缓冲区比较
* buf.compare(otherBuffer);
* otherBuffer 与buf对象比较的另外一个buffer对象
* 返回一个数字，表示buf在otherBuffer之前，之后或相同*/

var bj1=Buffer.from('ABC');
var bj2 = Buffer.from('ABCD');
var result = bj1.compare(bj2);
console.log(result)
if(result<0){
    console.log(bj1+'在'+bj2+'之前')
}else if(result=0){
    console.log(bj1+'与'+bj2+'相同')
}else{
    console.log(bj1+'在'+bj2+'之后')
}
