interface Foo {
    name: string;
    age?: number;
    gender: string;
}
type Bar = Pick<Foo, 'age' | 'gender'>