// 和Exclude 相反 取2个类型的交集

// case 1
type To = Extract<'a' | 'b' | 'c', 'a' | 'f'>
let a: To = 'a'

// case2

type A = number | string | boolean
type B = number | boolean

type Foo = Extract<A, B>
// 相当于
// type Foo = number | boolean