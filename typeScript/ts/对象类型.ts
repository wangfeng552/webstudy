// 1.接口一般首字母大写
interface Person {
    name: string,
    age: number
}

let tom: Person = {
    name: 'Tome',
    age: 12
}

// 定义的变量比接口少了一些或多一些属性是不允许的：
// let tom: Person = {
//     name: 'Tome',
// }


// 2.可选属性
interface Dog {
    name: string;
    age?: number;
}

let anli: Dog = {
    name: 'anli'
}



// 3.任意属性
interface Cat {
    name: string;
    age?: number;
    [propName: string]: string | number;
}

let cat: Cat = {
    name: 'Tom',
    gender: 'male'
};


// 4.只读属性 : readonly
// 注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：
interface Read {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let read: Read = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};

read.id = 9527; // 报错