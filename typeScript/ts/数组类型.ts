// [类型+方括号] 表示法
const userList: number[] = [1, 2, 3]

// 数组泛型 Array<类型>
const dogList: Array<number> = [23, 23, 23443, 35]

// 联合类型数组
const person: (number | string)[] = [1, 'sdf', 2]

// 用接口表示数组
interface NumberArray {
    [index: number]: number
}
let fib: NumberArray = [12, 3, 4, 5]

// 指定对象成员的数组
interface IArrObj {
    name: string
    age: number
}
let people: IArrObj[] = [{ name: '张安', age: 12 }]

// 类数组
function sum() {
    let args: IArguments = arguments;
}
// 其中 IArguments,NodeList, HTMLCollection 是 TypeScript 中定义好了的类型
interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
}

// any类型
let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];



// 只读数组
let ro: ReadonlyArray<number> = [1, 2, 3]
