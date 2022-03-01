// 1.接口一般首字母大写 + 建议接口的名称加上 I 前缀。
interface IPerson {
    readonly id: number;        // 只读属性
    name: string;
    age: number;
    isShow?: boolean; //可选属性
    [propName: string]: string | number; // 联合类型
    [key: string]: any          // 索引签名 任意属性
}


// 接口的扩展就是继承，通过 extends 来实现
interface PointX {
    x: number
}

interface Point extends PointX {
    y: number
}



// 3种绕开额外属性检查的方式
interface IYazi {
    name: string,
    age: number
}
// 1.鸭式辨型法
function raokai(params: IYazi) {
    console.log(params);
}
let t = { name: '鸭式', age: 12, isShow: true }
raokai(t)

// 2.类型断言
let yazi: IYazi = {
    name: 'lis',
    age: 12,
    money: -1000,
    girl: false
} as IYazi




// 将IPerson接口里的属性都变成可选
type OptionalTestInterface<T> = {
    [p in keyof T]+?: T[p]
    // +readonly [p in keyof T]+?:T[p]  //只读
}

type newTestInterface = OptionalTestInterface<IPerson>




// 将函数定义成接口
enum StorageType {
    local,
    session,
    cookie
}

interface Ishow {
    getItem<T>(name: StorageType, age: number): void
}

let obj: Ishow = {
    getItem: function (name, age) {
        console.log(name);
        console.log(age);

    }
}

obj.getItem(StorageType.session, 25)