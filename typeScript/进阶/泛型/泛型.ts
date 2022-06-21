// 指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定具体类型的一种特性。
// 其中T代表type T 是一个抽象类型，只有在调用的时候才确定它的值
// K （Key） 表示对象中的键类型
// V （Value）表示对象中的值类型
// E （Element）表示元素类型

function identity<T, M>(arg: T, msg: M): T {
    return arg
}

// 类型像传递给函数的参数一样传递
identity<number, string>(1, '1')


function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = []
    for (let i = 0; i < length; i++) {
        result[i] = value
    }
    console.log(result);
    return result
}
createArray<string>(4, 'a')

// 多个类型参数
function swap<T, U>(tuple: [T, U]): [U, T] {
    console.log([tuple[1], tuple[0]]);
    return [tuple[1], tuple[0]]
}
swap([7, 'a'])


// 类型约束 使用extends 约束了泛型 T 必须符合接口 ILength 的形状，也就是必须包含 length 属性。
interface ILength {
    length: number
}
function getLength<T extends ILength>(params: T) {
    console.log(params.length);
}
getLength([111])
getLength('12345dsfkjhg')



// 泛型接口
interface User<T, N> {
    name: T,
    age: N
}

const user: User<string, number> = {
    name: 'lisi',
    age: 12
}





