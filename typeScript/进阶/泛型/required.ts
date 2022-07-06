// Required 生成一个新类型，该类型与 T 拥有相同的属性，但是所有属性皆为必选项
interface Foo {
    name: string;
    age?: number
}

type Bar = Required<Foo>

let bar: Bar = {
    name: '1',
    age: 25
}