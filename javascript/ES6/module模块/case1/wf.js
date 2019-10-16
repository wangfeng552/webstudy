import {age} from './a1'
import {name as myname} from './a1'   //重命名导入的变量    as
import * as wfname from './a1'        //整体导入            * as

// 案例
console.log(age)
console.log(myname)
console.log(wfname.age)


// 默认导出方法
// 导入这个模块的时候取任意名字均可
import a1 from "./a1"
console.log(a1.name)


/*注意事项
* 1、声明的变量，对外都是只读的。
* 2.并不是所有导出的变量都不可修改，对象类型就可修改。
* 3.导入不存在的变量，值为undefined。
* */
