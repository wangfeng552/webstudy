// 函数声明
function fun(): string {
  return '123'
}


// 匿名函数
let fun2 = function (): number {
  return 12
}

// 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
let mySum2: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y
}


// 定义方法传参
function getInfo(name: string, age: number): string {
  return `${name}---${age}`
}


// 方法可选参数 必须放在后面使用?
function getInfo2(name: string, age?: number): string {
  return `${name}---${age}`
}


// 默认参数——将添加了默认值的参数识别为可选参数：
function getName(name: string = '123') { }


// 剩余参数  ...运算符接收新参传过来的值, rest参数只能是最后一个参数
function sum(...result: number[]): number {
  var sum = 0;
  for (var i = 0; i < result.length; i++) {
    sum += result[i]
  }
  return sum
}
sum(1, 2, 3)


// 方法重载
function getName(name: string): string;
function getName(age: number): number;
function getName(str: any): any {
  if (typeof str === 'string') {
    return '我叫：' + str;
  } else {
    return '我的额年龄是' + str
  }
}