// Partial  将类型的属性变成可选

// 1.将对象的属性变成可选
interface UserInfo {
    name: string,
    age: number
}

type NewUserInfo = Partial<UserInfo>;
const xiaoming: NewUserInfo = {
    name: 'xiaoming'
}

console.log(xiaoming);




// 2.处理多层对象的属性
interface Tree {
    name: string,
    age: number,
    children: {
        name: string,
        age: number
    }
}

type DeepPartial<T> = {
    // 如果是 object，则递归类型
    [U in keyof T]?: T[U] extends object
    ? DeepPartial<T[U]>
    : T[U]
};

type PartialedWindow = DeepPartial<Tree>; // 现在T上所有属性都变成了可选啦

const pl: PartialedWindow = {
    name: 'lise',
    children: {
        name: 'zs'
    }
}

console.log(pl);
