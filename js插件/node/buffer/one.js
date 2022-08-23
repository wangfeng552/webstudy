const buf=Buffer.from('runoob','ascii');

// <Buffer 72 75 6e 6f 6f 62>
console.log(buf)

// 输出 72756e6f6f62
console.log(buf.toString('hex'))

// 输出 cnVub29i
console.log(buf.toString('base64'))

