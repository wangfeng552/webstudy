// pick 从某个类型中挑出一些属性出来， 新类型 相当于 T 与 K 的交集
// type Pick<T, K extends keyof T> = {
// [P in K]: T[P];
// };


interface Person {
    name: string;
    age: number;
    isShow: boolean
}

type todoPrivew = Pick<Person, 'name' | 'age'>

const lisi: todoPrivew = {
    name: '李四',
    age: 25
}

console.log(lisi);
