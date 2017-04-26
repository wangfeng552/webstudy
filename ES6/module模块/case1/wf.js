import {name as myname,age,says} from "./a1"
//导入name属性 并赋值给变量name
//as 重命名

console.log(myname)
console.log(age)
says(123)


/*import * as obj from "./a1"
//使用*实现整体导入
console.log(obj.name)
console.log(obj.age)*/

// 默认导出后
// 导入这个模块的时候取任意名字均可
/*import a1 from "./a1"
console.log(a1.name)*/


/*注意事项
* 1、声明的变量，对外都是只读的。
* 2.并不是所有导出的变量都不可修改，对象类型就可修改。
* 3.导入不存在的变量，值为undefined。
*
* */
