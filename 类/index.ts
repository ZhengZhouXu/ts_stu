/* 1.类 */
class Greeter {
  greeting: string;
  constructor (message: string) {
    this.greeting = message
  }
  greet () {
    return 'Hello, ' + this.greeting
  }
}

let greeter = new Greeter("world")

/* 2.继承 */
// demo1
// class Animal {
//   move (distanceInMeters: number = 0) {
//     console.log(`Animal moved ${distanceInMeters}m.`)
//   }
// }

// class Dog extends Animal {
//   bark () {
//     console.log('woof woof')
//   }
// }

// const dog = new Dog()
// dog.bark()
// dog.move(10)
// dog.bark()

// demo2
class Animal {
  name: string
  constructor (theName: string) {
    this.name = theName
  }
  move (distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`)
  }
}

class Snake extends Animal {
  constructor (theName: string) {
    super(theName)
  }
  move (distanceInMeters = 5) {
    console.log("Slithering...")
    super.move(distanceInMeters)
  }
}

class Horse extends Animal {
  constructor (theName: string) {
    super(theName)
  }
  move (distanceInMeters = 45) {
    console.log('Galloping...')
    super.move(distanceInMeters)
  }
}

let sam = new Snake('sam the Python')
let tom: Animal = new Horse('Tommy the Palomino')
sam.move()
tom.move(34)

/* 3.公共，私有与受保护的修饰符 */

// 如果结构相同可以互相赋值
// 默认所有字段都为public
class Animal2 {
  public name: string
  public constructor (theName: string) {
    this.name = theName
  }
}

class Employee2 {
  name: string
  constructor (theNam: string) { // 形参名称不同也行
    this.name = theNam
  }
}

let animal2 = new Animal2('Goat')
let employee2 = new Employee2('Bob')

animal2 = employee2 // 两个虽然不是同一个类，但是结构相同，可以相互赋值

// 同上，如果在两个类分别定义了相同的私有参数，不视为结构相同
class Animal3 {
  private name: string
  constructor (theName: string) {
    
  }
}

class Employee3 {
  private name: string
  constructor (theNam: string) { // 形参名称不同也行
    this.name = theNam
  }
}

let animal3 = new Animal3('Goat')
let employee3 = new Employee3('Bob')
// animal3 = employee3 // error 具有私有变量声明

/* 4.理解 protected */
// protected 与 private 相似，但是 projected 在派生类(子类)中仍可访问
class Person {
  protected name: string
  constructor (name: string) {
    this.name = name
  }
}

class Employee4 extends Person {
  private department: string

  constructor (name: string, depaerment: string) {
    super(name)
    this.department = depaerment
  }

  public getElevatorPitch () {
    // 能够访问 this.name
    return `Hello, my name is ${this.name} and I work in ${this.department}.`
  }
}

let howard = new Employee4('Howard', 'Sales')
howard.getElevatorPitch()
// howard.name // error name属性受保护，不能访问

// 将构造函数设置为 protected 那么该类不能被实例化（继承的子类可以 ）
class Person2 {
  protected name: string
  protected constructor (name: string) {
    this.name = name
  }
}

class Employee5 extends Person2 {
  private department: string

  constructor (name: string, department: string) {
    super(name)
    this.department = department
  }

  public getElevatorPitch() {
      return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard2 = new Employee5('Howard', 'Sales')
// let john = new Person2('John') // error 构造函数是受保护的，不能实例化

/* 5.readonly 修饰符 */
// 可以将属性设置成 readonly， 那么该属性只能申明时，或是在构造函数中初始化
class Octopus {
  readonly name: string
  readonly numberOfLegs: number = 8
  constructor (theName: string) {
    this.name = theName
  }
}
let dad = new Octopus('Man with the 8 strong legs')
// dad.name = "1123" // 无法给只读属性赋值

/* 6.参数属性 */
// 属性定义的语法糖
class Animal4 {
  constructor (private name: string) {
  }
  move (distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

// 相当于
// class Animal4 {
//   private name: string
//   constructor (theName: string) {
//     this.name = theName
//   }
//   move (distanceInMeters: number) {
//     console.log(`${this.name} moved ${distanceInMeters}m.`);
//   }
// }

/* 6.存取器 get, set */
// 不使用存取器的情况
class Employee6 {
  fullname: string
}

let employee6 = new Employee6()
employee6.fullname = "Bob Smith" // 随意赋值有时可能会收到意想不到的值

// 使用存取器
let passcode = '123456'

class Employee7 {
  private _fullname: string

  get fullname ():string {
    return this._fullname
  }

  set fullname (newName: string) {
    if (passcode && passcode === '123456') {
      this._fullname = newName
    } else {
      console.log("Error: Unauthorized update of employee!");
    }
  }
}
let employee7 = new Employee7()
employee7.fullname = "Bob Smith" // 对赋值进行检测，可以预防意外的值
// 注意点: 只带有 get 而没有 set 存取器 会被判断为 readonly

/* 7.静态属性 */
class StaticClass {
  static fullname: string
  greet (): void {
    console.log(StaticClass.fullname) // 获取静态属性的方式   
  }
}

let s = new StaticClass()
StaticClass.fullname = '1123'
// s.fullname = '123' // error 实例对象中，不能拿到静态属性

/* 8.抽象类 */
// 同接口一样，不能被实例化，但是可以实现包含成员的细节（介于接口和抽象类之间）
abstract class Animal5 {
  abstract makeSound (): void // 抽象方法，不用实现，但是必须在子类中实现

  // 非抽象方法
  move (): void {
    console.log('roaming the earch...')
  }
}

// demo2
abstract class Department {
  constructor (public name: string) {}

  printName (): void {
    console.log('Department name: ' + this.name)
  }

  abstract printMeeting(): void // 必须在派生类中实现
}

class AccountingDepartment extends Department {
  constructor () {
    super('Accounting and Auditing')
  }

  printMeeting (): void {
    console.log('The Accounting Department meets each Monday at 10am.')
  }

  generateReports(): void {
    console.log('Generating accounting reports...')
  }
}

let department: Department // 允许创建一个对抽象类型的引用
// department = new Department('1') // error 抽象类不能被实例化
department = new AccountingDepartment() // 允许对一个抽象子类进行实例化和赋值
department.printMeeting()
department.printName() // 抽象类中继承的方法
// department.generateReports() // error 虽然子类中存在该方法，但是不存在与抽象类中（与前面定义的类型相关）

