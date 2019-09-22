//   布尔类型		(boolean)
//   数字类型  	(number)
//   字符串    	(string)
//   数组      	(array)
//   元祖  		(tuple)
//   枚举			(enum)
//   任意			(any)
//   null和undefined
//   void类型
//   never类型

var flag:boolean = true


// 数组类型有2种方式
var arr:number[] = [1,2];

var arr2:Array<number>=[1,2,3]
var arr3:Array<any>=[1,2,3,'213',true]


// 元祖类型(tuple)  属于数组的一种

// var arr2:Array<number>=[1,2,3]
let arr4:[number,string]=[123,'sadf']



// 枚举类型
// enum 枚举名{
//   标识符[=整型常熟]
//   标识符[=整型常熟]
//   ...
//   标识符[=整型常熟]
// }

enum Flag {success = 1,error =2}

let s:Flag=Flag.success
console.log(s) //=>1



// null 和 undefined 其他（never类型） 数据类型的子类型

var num:number
console.log(num)   // => undefined

var num2:undefined

var num3 :number | undefined;



// void 类型： 表示没有任何类型，一般用于定义方法的时候方法没有返回值

function run():void{
  console.log('run')
}

function run2():number{
  return 123
}

