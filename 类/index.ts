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