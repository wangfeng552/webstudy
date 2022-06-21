// 1.Objects / Functions
interface Point {
    x: number;
    y: number;
}

interface SetPoint {
    (x: number, y: number): void
}

type Point1 = {
    x: number;
    y: number;
}

type setPoint1 = (x: number, y: number) => void;


// 2.接口可以定义多次,类型别名不可以
// 与类型别名不同，接口可以定义多次，会被自动合并为单个接口。
interface Point { x: number; }
interface Point { y: number; }
const point: Point = { x: 1, y: 2 };

// 3.Other Types
// 与接口不同，类型别名还可以用于其他类型，如基本类型（原始值）、联合类型、元组。
type Name = string;

// object
type PartialPointX = { x: number; };
type PartialPointY = { y: number; };

// union
type PartialPoint = PartialPointX | PartialPointY;

// tuple
type Data = [number, string];

// dom
let div = document.createElement('div');
type B = typeof div;


// 4.两者的扩展方式不同，但并不互斥。接口可以扩展类型别名，同理，类型别名也可以扩展接口。
// 接口的扩展就是继承，通过 extends 来实现。类型别名的扩展就是交叉类型，通过 & 来实现。

// 接口扩展接口
interface PointX {
    x: number
}
interface Point extends PointX {
    y: number
}

// 类型别名扩展类型别名
type PointW = {
    w: number
}
type PointS = PointW & { y: number }

// 接口扩展类型别名
type PointA = {
    a: number
}
interface PointAll extends PointA {
    b: number
}

// 类型别名扩展接口
interface PointC {
    c: number
}

type PointD = PointC & {
    d: number
}