/* 1.类型兼容性 */
interface Named {
  name: string
}

class Person {
  name: string
}

let p: Named
p = new Person() // 结构相同类型兼容


// demo2
// 类型兼容性，有时不要求结构完全相同
interface Named2 {
  name: string
}

// let x: Named2 = {name: '123', location: 'Seattle'} // 不能使用字面量形式
let x: Named2
let y = {name: '123', location: 'seattle'}
x = y

/* 比较两个函数 */
// 函数兼容，对应位置上的类型相同即可，可以缺少参数，但不能多参数
let x2 = (a: number) => 0
let y2 = (b: number, s: string) => 0

y2 = x2 // ok
// x2 = y2 // error

// 函数返回值兼容
let x3 = () => ({name: 'Alice'})
let y3 = () => ({name: 'Alice', location: 'Seattle'})

x3 = y3
// y3 = x3 // error x3的返回值缺少 location

/* 函数参数双向协变 */
enum EventType {
  Mouse,
  Keyboard
}

interface Event {
  timestamp: number
}

interface MouseEvent extends Event {
  readonly x: number // 使用 x
  readonly y: number
}

interface KeyEvent extends Event {
  keyCode: number 
}

function listenEvent(eventType: EventType, handle: (n: Event) => void) {
  /* ... */
}

listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + e.y))
// 不知道下面两种有什么用，只是知道可以这么写就好
listenEvent(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + (<MouseEvent>e).y))
listenEvent(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.x + e.y)))

/* 可选参数及剩余参数 */
// 源类型上有额外的可选参数不是错误，目标类型的可选参数在源类型里没有对应的参数也不是错误。
function  invokeLater (arg: any[], callback: (...arg: any[]) => void) {
  // ...
}
invokeLater([1, 2], (x, y) => console.log(x + ', ' + y))
invokeLater([1, 2], (x?, y?) => console.log(x + ', ' + y))

/* 枚举类型 */
// 枚举类型与数字类型兼容，并且数字类型与枚举类型兼容。不同枚举类型之间是不兼容的。
enum Status { Ready, Waiting }
enum Color { Red, Blue, Green }

// 枚举类型和数字类型互相兼容（枚举类型没有指定值）
let n: number = Status.Ready
let e: Status = 1

let status1: Status = Status.Ready
// status1 = Color.Red // error 不同枚举类型不能兼容

/* 类 */
// 类有静态部分和实例部分的类型。 比较两个类类型的对象时，
// 只有实例的成员会被比较
// 静态成员和构造函数不比较

class Animal {
  static animalName: string
  feet: number
  constructor (name: string, numFeet: number) {}
}

class Size {
  feet: number
  constructor (name: string) {}
}

// 不对静态类型和构造函数进行检查
let a1: Animal
let s: Size
a1 = s
s = a1

/* 泛型 */
// 比较内部的结构是否相同，而不是比较泛型参数
// demo1
interface Empty<T> {
}

let x1: Empty<number>
let y1: Empty<string>
x1 = y1 // x1 和 y1 的内部结构相同

// demo2
interface NotEmpty<T> {
  data: T
}

let x4: NotEmpty<number>
let y4: NotEmpty<string>
// x4 = y4 // error 内部结构不同

// 泛型方法，会将所有泛型参数转化为 any
let identity = function<T>(x: T): T {
  return x
}

let reverse = function<U>(y: U): U {
  return y
}

identity = reverse // (x: any)=>any = (y: any)=>any