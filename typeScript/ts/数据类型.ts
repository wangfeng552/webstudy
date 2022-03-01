//   布尔   		(boolean)
//   数字  	    (number)
//   字符串    	(string)
//   数组      	(array)
//   元祖  		  (tuple)
//   枚举			  (enum)
//   任意			  (any)
//   unknown    未知类型
//   null
//   undefined
//   void类型     没有任何类型
//   never类型    永远不存在的值的类型，抛出错误

let address: string = '123'
let age: number = 1
let isShow: boolean = false
let u: undefined = undefined
let n: null = null

// 任意值
let myFavoriteNumber: any = 'seven'
myFavoriteNumber = 7

// 数组类型有2种方式
let arr: number[] = [1, 2];
let arr2: Array<number> = [1, 2, 3]
let arr3: Array<any> = [1, 2, 3, '213', true]


// null 和 undefined 其他（never类型） 数据类型的子类型
let num: number
console.log(num)   // => undefined
let num2: undefined
let num3: number | undefined;


// void 类型： 表示没有任何类型，一般用于定义方法的时候方法没有返回值
function run(): void {
  console.log('run')
}
function run2(): number {
  return 123
}

// never 类型表示的是那些永不存在的值得类型。

