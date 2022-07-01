class Animal {
    public name: string; // 允许在类的内部和外部被调用
    private age: string; // 只允许再类的内部被调用，外部不允许调用
    protected address: string; // 允许在类内及继承的子类中使用
    readonly read: string; // 将属性设置为只读的
}