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