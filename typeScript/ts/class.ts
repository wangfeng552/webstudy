
class Person {
  name:string;
  constructor(n:string){ // 构造函数 实例化类的时候触发的方法
    this.name = n
  }
  run():void{
    console.log(this.name)
  }
}

var wf= new Person('张三')
wf.run() // => '张三'


// 2 ts中实现继承 extends、super
class Web extends Person {
  constructor (name:string){
    super(name)  //初始化父类的构造函数
  }
}

var w =new Web('李四')
w.run() // => '李四'

// 3. 类里面的修饰符
/**
 * public       公有 在类里面 子类 类外面都可以访问
 * protected    保护 在类里面 子类里面可以访问，在类外没发访问
 * private      私有 在类里面可以访问 子类和类外都不能访问
 */