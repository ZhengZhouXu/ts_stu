/* 交叉类型 */
// 交叉类型是将多个类型合并为一个类型。
// 例如， Person & Serializable & Loggable同时是 Person 和 Serializable 和 Loggable
// 就是说这个类型的对象同时拥有了这三种类型的成员
function extend<T, U> (first: T, second: U): T & U {
  let result: T & U = <T & U> {} 
  for (let id in first) {
    (<any>result)[id] = (<any>first)[id]
  }
  for (let id in second) {
    (<any>result)[id] = (<any>second)[id]
  }

  return result
}

class Person1 {
  constructor (public name: string) {}
}

interface Loggable {
  Log(): void
}

class ConsoleLogger implements Loggable {
  Log () {
    // ..
  }
}

// 两个类中的方法属性都可以使用
let jim = extend(new Person1('jim'), new ConsoleLogger())
jim.name
jim.Log

// 联合类型
// 只能指定类型中的其中一个，并且可用的字段必须得是共有的
let a: string | number = (function (): string | number {
  return '123'
})();
// a.length // error 共有的属性
(a as string).length // 如果明确类型，可以通过断言来获取

a.toString() // 公共方法

a = '123'
a.length // 如果已经确定则可以调用特有的字段

/* 用户自定义类型保护 */
interface Bird {
  fly()
  layEggs()
}

interface Fish {
  swim()
  layEggs()
}
function getSmallPet(): Fish | Bird {
  let a: Fish
  return a
}

let pet = getSmallPet()

// 一般用不到，大概了解一下
function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined
}

if (isFish(pet)) {
  pet.swim()
} else {
  pet.fly()
}

/* 可选参数和可选类型 */
// 使用了 --strictNullChecks，可选参数会自动加上 | undefined
// 可选属性同理

/* 类型别名 */
type Name = string
type NameResolver = () => string

/* 多态的 this类型 */
class BasicCalculator {
  public constructor(protected value: number = 0) { }
  public currentValue(): number {
      return this.value;
  }
  public add(operand: number): this {
      this.value += operand;
      return this;
  }
  public multiply(operand: number): this {
      this.value *= operand;
      return this;
  }  
}

let v = new BasicCalculator(2)
          .multiply(5)
          .add(1)
          .currentValue();

/* 映射类型 */
// 一个常见的任务是将一个已知的类型每个属性都变为可选的
// 或者一个只读版本
// ts 中已经自带这两个变量
type Readonly1<T> = {
  readonly [P in keyof T]: T[P]
}

type Partial1<T> = {
  [P in keyof T]?: T[P]
}

type PersonPartial = Partial1<Person1>

// 映射
type Keys = 'option1' | 'option2'
type Flags = { [K in Keys]: boolean }

// 转换一个类型时使用
type NullablePerson = { [P in keyof Person1]: Person1[P] | null }
type PartialPerson = { [P in keyof Person1]?: Person1[P] }
type haha = Record<12 | 34, string>

type Proxy<T> = {
  get(): T;
  set(value: T): void;
}
type Proxify<T> = {
  [P in keyof T]: Proxy<T[P]>;
}
function proxify<T>(o: T): Proxify<T> {
 let a: Proxify<T>
 return a
}
let proxyProps = proxify({
  name: '123',
  test: 321
});
