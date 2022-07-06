// Record 后面的泛型就是对象键和值的类型。
// Record<K extends keyof any, T> 的作用是将 K 中所有的属性的值转化为 T 类型

interface Person {
    title: string
}

type Page1 = "home" | 'about' | 'concat'


const x1: Record<Page1, Person> = {
    home: {
        title: '1'
    },
    about: {
        title: '2'
    },
    concat: {
        title: '3'
    }
}