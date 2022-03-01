// 类型断言可以用来手动指定一个值的类型。
// 语法： 值 as 类型

const arrayNumber: number[] = [1, 2, 3, 4]
const greaterThan2: number = arrayNumber.find(v => v > 2) as number


// 确定赋值断言
let x!: number  // ! 号，从而告诉 TypeScript 该属性会被明确地赋值 非null和undefined
initialize()
console.log(2 * x);
function initialize() {
    x = 10
}


// 类型断言的意义就等同于你在告诉程序，你很清楚自己在做什么，此时程序自然就不会再进行额外的属性检查了。
interface IAnimal {
    name: string,
    age: number,
    money?: number
}
let dog: IAnimal = {
    name: 'liDog',
    age: 18,
    isBig: false
} as IAnimal
