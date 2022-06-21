// 接口定义函数
interface SearchFunc {
    (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
    return source.search(subString) !== -1;
}


// 使用泛型的接口来定义函数的形状
interface CreateArrayFunc {
    <T>(length: number, value: T): Array<T>;
}
let createArry: CreateArrayFunc
createArry = function <T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
createArry(3, 'aa')


// 进一步，我们可以把泛型参数提前到接口名上：
interface CreateArrayFunc2<T> {
    (length: number, value: T): Array<T>;
}

let createArrayNew: CreateArrayFunc2<any>;
createArrayNew = function <T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArrayNew(3, 'x'); // ['x', 'x', 'x']
// 注意，此时在使用泛型接口的时候，需要定义泛型的类型。