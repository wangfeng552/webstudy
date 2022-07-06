type Bar = {
    readonly name: string;
    age: number
}

let bar: Bar = {
    name: 'ks',
    age: 23
}

// bar.name = '11'  //报错了 name是只读的