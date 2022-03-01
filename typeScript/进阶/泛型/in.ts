// in 用来遍历枚举类型：

type Keys = 'a' | 'b' | 'c'

type Obj = {
    [p in Keys]: any
}
// -> { a: any, b: any, c: any }


function show(params: Obj) {
    console.log(params);
}

show({ a: '12', b: true, c: 3 })
