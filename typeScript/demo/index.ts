// function show(length,name){}

interface ShowFun<T> {
    (lentgh: number, age: T): Array<T>
}

let showFun: ShowFun<string>
showFun = function <T>(lentgh: number, age: T): Array<T> {
    let result: T[] = []
    for (let i = 0; i < lentgh; i++) {
        result[i] = age
    }
    console.log(result);
    return result
}

showFun(3, '11')