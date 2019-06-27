var name="张三";
var age="45";
var says=function (a) {
    alert(a)
}
export {name,age,says}




//默认导出
var obj={
    name:"张三",
    age:"45",
    say:function (a) {
        alert(a)
    }
}
export default obj


// 第一组是不使用export default时，对应的import语句需要使用大括号
// 第二组是使用export default时，对应的import语句不需要使用大括号；
