// 元组最重要的特性是可以限制数组元素的个数和类型，它特别适合用来实现多值返回。

// 数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。
let tom:[string,number] = ['Tom',25]


// 下标获取值
let house:[string,number]
house[0] = '这里'
house[1] = 125


// 元祖类型的解构赋值
let [address,count] = house


// 元组类型的可选元素
let optionalTuple :[string,boolean?];
optionalTuple = ['你好']


// 元组类型的剩余元素
type RestTupleType = [number, ...string[]];
let restTuple: RestTupleType = [666, "Semlinker", "Kakuqo", "Lolo"];

// 只读的元组类型
const point:readonly[number,number] = [1,2]


// 越界的元素
// 当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型
let animal:[string,number];
animal = ['cat',12]
animal.push('lisi')
animal.push(true)  // // Argument of type 'true' is not assignable to parameter of type 'string | number'.
