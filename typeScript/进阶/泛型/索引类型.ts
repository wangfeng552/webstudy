interface Deng {
    name: string,
    age: number
}
const personDeng: Deng = {
    name: 'll',
    age: 25
}
// T[K]表示对象T的属性K所表示的类型 || T[K][] 表示变量T取属性K的值的数组
function getValues<T, K extends keyof T>(person: T, keys: K[]): T[K][] {
    return keys.map(key => person[key])
}

console.log(getValues(personDeng, ['name', 'age']))