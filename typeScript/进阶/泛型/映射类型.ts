interface TestInterface {
    name: string,
    age: number
}

type OptionalTestInterface<T> = {
    [p in keyof T]+?: T[p]
}

type mewTextInterface = OptionalTestInterface<TestInterface>

// type newTestInterface = {
//    name?:string,
//    age?:number
// }


// 必填项
type OptionTestRequired<T> = {
    [p in keyof T]-?: T[p]
}

type newOptionRequire = OptionTestRequired<TestInterface>

let opt: newOptionRequire = {
    name: 'lisi',
    age: 45
}