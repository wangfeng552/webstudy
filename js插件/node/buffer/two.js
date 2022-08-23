// 创建一个长度为 10、且用 0 填充的 Buffer。
// <Buffer 00 00 00 00 00 00 00 00 00 00>
const buf1 = Buffer.alloc(10);

//创建一个长度为 10、且用 01 填充的 Buffer。
//<Buffer 01 01 01 01 01 01 01 01 01 01>
const buf2= Buffer.alloc(10,1)

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
//<Buffer b0 22 a5 e4 24 02 00 00 c0 d4>
const buf3 =Buffer.allocUnsafe(10).fill(2)

//创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
//<Buffer 01 02 03>
const buf4 = Buffer.from([1,2,3])

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
//<Buffer 74 c3 a9 73 74>
const buf5 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
//<Buffer 74 e9 73 74>
const buf6 = Buffer.from('tést','latin1');

console.log(buf6)