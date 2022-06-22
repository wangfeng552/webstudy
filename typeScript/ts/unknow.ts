// unknown与any一样，所有类型都可以分配给unknown:
let m: unknown = 12
m = '12'


// unknown类型只能赋值给any类型和unknown类型本身
let un: unknown

let value3: any = un
let value4: unknown = un

let value1: string = un  // Error
let value2: number = un  // Error
