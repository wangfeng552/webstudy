require.config(
    // baseUrl:'/',
    {
        paths:{
            "a1":"lib/a",
            "b":"lib/b",
            "c":"others/c",
            "jquery":"https://static.zhong.com/pc/skin/js/jquery-1.11.2"
        }
    }
)

/*require(['a','b','c'],function(a,b,c){
    a.hello();
    b.hello();
    c.hello();
});*/

//语法：require([module], callback);加载依赖模块，并执行加载完后的回调函数
//第一个参数[module]，是一个数组，里面的成员就是要加载的模块；
// 第二个参数callback，则是加载成功之后的回调函数。如果将前面的代码改写成AMD形式，就是下面这样：
require(['jquery'],function($){
    $(".mk").css("color","red")
})


//a.hello()与a模块加载不是同步的，浏览器不会发生假死。所以很显然，AMD比较适合浏览器环境。


/*
baseUrl指定所有文件的主要目录，paths配置模块名字以及其匹配的加载路径。

当有需要使用某些模块时，就可以通过require([xxx],function(xxx){xxx});的方式使用。*/
