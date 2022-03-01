interface Waiter {
    anjiao: boolean;
    say: () => {}
}

interface Teacher {
    anjiao: boolean;
    skill: () => {}
}

// 1.类型保护-类型断言
function show(animal: Waiter | Teacher) {
    if (animal.anjiao) {
        (animal as Teacher).skill()  //类型断言
    } else {
        (animal as Waiter).say()
    }
}

// 2.类型保护-in语法
function judgeWhoTwo(animal: Waiter | Teacher) {
    if ("skill" in animal) {
        animal.skill();
    } else {
        animal.say();
    }
}

show({
    anjiao: true, skill: function (): any {
        console.log(1111);
    }
})


// 3.类型保护-typeof方法
function add(first: string | number, second: string | number) {
    if (typeof first === "string" || typeof second === "string") {
        return `${first}${second}`;
    }
    return first + second;
}


// 4.类型保护-instanceof语法 只能用在类上
class NumberObj {
    count: number;
}

function addObj(first: object | NumberObj, second: object | NumberObj) {
    if (first instanceof NumberObj && second instanceof NumberObj) {
        return first.count + second.count
    }
    return 0
}