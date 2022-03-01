// 交叉类型是将多个类型合并为一个类型
type IntersectionType = { id: number; name: string; } & { age: number };
const mixed: IntersectionType = {
    id: 1,
    name: 'name',
    age: 18
}

console.log(mixed);

