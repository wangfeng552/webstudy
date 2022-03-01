// 枚举默认从0开始
enum Status {
    MASSAGE,
    SPA,
    DABAOJIAN,
}
// 初始化为1
enum Direction {
    UP = 1,
    DOWN,
    LEFT,
    RIGHT
}

function getServe(status: any) {
    if (status === Status.MASSAGE) {
        console.log('message')
    } else if (status === Status.SPA) {
        console.log('spa');

    } else if (status === Status.DABAOJIAN) {
        console.log('dabaojian');
    }
}

getServe(1)  // 枚举类型是有对应的数字值的，默认是从 0 开始的
getServe(Status.SPA)

console.log(Status.MASSAGE);    // 0
console.log(Status.SPA);        // 1
console.log(Status.DABAOJIAN);  // 2


// 枚举通过下标反查
console.log(Status[1]);  // SPA
