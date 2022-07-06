// Omit
// 实现 Omit<T, K>，作用恰好与 Pick<T, K> 相反，排除对象 T 中的 K key：

interface Todo {
    title: string
    desc: string
    completed: boolean
}

type newTodo = Omit<Todo, 'title' | 'desc'>  // TS语法 Omit直接实现

type TodoPreview = MyOmit<Todo, 'title' | 'desc'>

const todo: TodoPreview = {
    completed: false,
}

type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

console.log(todo);

