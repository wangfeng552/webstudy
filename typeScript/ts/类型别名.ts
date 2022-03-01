// 类型别名用来给一个类型起个新名字。
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n
    } else {
        return n()
    }
}


type EventNames = 'click' | 'scroll' | ' mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('app'), 'scroll'); // ok
handleEvent(document.getElementById('app'), 'dblclick'); // 报错 ，event 不能为 'dblclick'


// 字符串字面量类型
type Direction = 'up' | 'down'

function wf(name: Direction): any {
    console.log(name);

}

wf('up')



// 类型别名 通过交集(&)扩展类型
type Person = {
    name: string
}

type Student = Person & {
    age: number
}

const sanban: Student = {
    name: 'lis',
    age: 22
}