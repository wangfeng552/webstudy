// 2.keyof 获取某种类型的所有键，返回联合类型
interface People {
    name: string
    age: number
}
type k1 = keyof People // 'name'|'age'
type k2 = keyof People[] // "length" | "toString" | "pop" | "push" | "concat" | "join" 
// 在 TypeScript 中支持两种索引签名，数字索引和字符串索引：
type k3 = keyof { [x: string]: People } // string |number
type k4 = keyof { [x: number]: People } // number


type Todo = {
    id: number;
    text: string;
    done: boolean;
}
const todo: Todo = {
    id: 1,
    text: "Learn TypeScript keyof",
    done: false
}
// 首先定义了 T 类型并使用 extends 关键字约束该类型必须是 object 类型的子类型，
// 然后使用 keyof 操作符获取 T 类型的所有键，其返回类型是联合类型，最后利用 extends 关键字约束 K 类型必须为 keyof T 联合类型的子类型。
function prop<T extends object, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}
const id = prop(todo, "id"); // const id: number
const text = prop(todo, "text"); // const text: string
const done = prop(todo, "done"); // const done: boolean