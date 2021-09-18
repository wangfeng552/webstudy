class Animal {
    public name: string; // 公共
    private age: string; // 它就不能在声明它的类的外部访问
    protected address: string; // protected修饰符与 private修饰符的行为很相似，但有一点不同， protected成员在派生类中仍然可以访问
    readonly read: string; // 将属性设置为只读的
}