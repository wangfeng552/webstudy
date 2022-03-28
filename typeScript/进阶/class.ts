// public 允许在类的内部和外部被调用.
class Person {
  public name: string;
  public sayHello() {
    console.log(this.name + 'say Hello')
  }
}
//-------以下属于类的外部--------
const person = new Person()
person.name = 'jspang.com'
person.sayHello()
console.log(person.name)




// private 访问属性的意思是，只允许再类的内部被调用，外部不允许调用
class Fruits {
  private name: string;
  public show() {
    console.log(this.name + 'say Hello')  //此处不报错
  }
}
//-------以下属于类的外部--------
const apple = new Fruits()
apple.name = 'apple'    //此处报错
apple.show()
console.log(apple.name)  //此处报错





// protected  允许在类内及继承的子类中使用
class Animal {
  protected name: string = '12';
  public say() {
    console.log(this.name + 'sayhellow')
  }
}
class Dog extends Animal {
  public sayBye() {
    console.log(this.name)
  }
}
const huanghuang = new Dog()
huanghuang.sayBye()





// 构造函数
class Plsdf {
  constructor(public name: string) {
    this.name = name
  }
  say() {
    console.log(this.name)
  }
}
let p = new Plsdf('ll')
p.say()



// 类继承中的构造器写法
class Lkke {
  public name: string
  public color: string
  constructor(name: string, color: string) {
    this.name = name
    this.color = color
  }
  say() {
    console.log(this.name);

  }
}

class Sjk extends Lkke {
  constructor(public age: number) {
    super('wf', 'red') // 在子类中使用构造函数需要用super()调用父类的构造函数
  }
}

let p = new Sjk(12)
console.log(p.name);
console.log(p.age);
console.log(p.color);




// getter 和setter
class Lksdfj {
  constructor(private _age: number) { }
  get age() {
    return this._age - 10
  }
  set age(age: number) {
    this._age = age + 3
  }
}

const dajiao1 = new Lksdfj(28)
dajiao1.age = 25
console.log(dajiao1.age);


interface Person2{
  name:string;
  age:number;
  say():string
}

class Zhangsan implements Person2 {
  name ='李四'
  age=25
  say(){
    return '123'
  }
}
