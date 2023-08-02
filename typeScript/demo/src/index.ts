let str: string = "12"
let count: number = 12
let isShow: boolean = true
let isUndefined: undefined = undefined
let isNull: null = null


let arr: string[] = ['1', '2']
let arr2: Array<string> = ['1', '2']

let arr22: (string | number)[] = ['1', 2, 222]

let userName: null | undefined | string;
userName='2222'
console.log(userName!.toString());

let hello: 'hello' = 'hello'
console.log(hello);

type Direction = 'up' | 'down'

function showDir(params: Direction) { 
    console.log(params);
}

showDir('up')

interface Address { 
    name: 'up' | 'down'
    age: 2 | 4 | 6
    isGirl:true|false
}

let a: Address = {
    name: 'down',
    age: 2,
    isGirl:true
}


let user = count === 3 ? '3' : count === 12 ? '12' : '2'


console.log(user);

type Person = { id: number } & { age: number } & Address

let li: Person = {
    id: 1,
    age: 2,
    name: 'up',
    isGirl:false
}

console.log(li);



