// define(["math"],function(math){
//     var opp=function(){
//         return math.add(2,5)+math.add(6,3)
//     }
//     return {
//         opp:opp
//     }
// })

define(["math","c"],function (math,c) {
    var a1=function () {
        return math.add(2,10)
    }
    var a2=function () {
        return c.hello(123)
    }
    return {a1:a1,a2:a2}
})
