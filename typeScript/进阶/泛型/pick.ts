// pick 从某个类型中挑出一些属性出来

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
