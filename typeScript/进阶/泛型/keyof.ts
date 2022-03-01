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
function prop<T extends object, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}
const id = prop(todo, "id"); // const id: number
const text = prop(todo, "text"); // const text: string
const done = prop(todo, "done"); // const done: boolean