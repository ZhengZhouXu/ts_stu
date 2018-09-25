/* 1.接口初探 */
function printLabel1 (labelledObj: { label: string}) {
  console.log(labelledObj.label)
}
// 只检查必须的参数是否存在，不在乎是否有多余的参数
let myObj1 = {size: 10, label: 'size 10 Object'}
printLabel1(myObj1)

// 使用接口
interface LabelledValue {
  label: string
}

function printLabel2(labelledObj: LabelledValue) {
  console.log(labelledObj.label)
}
let myObj2 = {size: 10, label: 'size 10 Object'}
printLabel2(myObj2)

/* 可选属性 */
interface SquareConfig {
  color?: string
  width?: number
}

function createSquare(config: SquareConfig): {color: string, area: number} {
  let newSquare = {color: 'white', area: 100} // 默认值
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }

  return newSquare
}

let mySquare = createSquare({color: 'black'})

/* 2.只读属性 */
interface Point {
  readonly x: number
  readonly y: number
}

// 只能通过初始化的方式赋值
let p1: Point = {x: 10, y: 20}
// p1.x = 5 // error
p1 = {x: 20, y: 30}
// 属性使用 readonly 变量使用 const

/* 3.额外的属性检查 */
// 对字面量的参数进行额外的检查
interface SquareConfig2 {
  color?: string
  width?: number
}

function createSquare2 (config: SquareConfig2): void {

}
// error 字面量类型只能传递接口中定义的参数
// 不能传递额外参数
// let mySquare2 = createSquare2({colour: 'red', width: 100}) 

// 解决方案
// 1.可以使用断言
createSquare2({colour: 'red', width: 100} as SquareConfig2) 

// 2.添加字符串索引签名
interface SquareConfig3 {
  color?: string
  width?: number
  [propName: string]: any // 字符串索引签名（此处的意思是，可能存在任意多的额外属性）
}

function createSquare3 (config: SquareConfig3): void {

}

createSquare3({colour: 'red', width: 100})

// 3. 直接赋值给一个对象，然后再将对象传递给方法

// 理论上不应该跳过 额外的属性检查

/* 4.函数类型 */
interface SearchFunc {
  (source: string, subString: string): boolean
}

// 函数名，函数参数名，不一定要与接口相匹配
let mySearch: SearchFunc = function (src: string, sub: string): boolean {
  let result = src.search(sub)
  return result > -1
}

// 也可以不指定对应的类型，ts会根据接口自动检查
let mySearch2: SearchFunc = function (src, sub) {
  let result = src.search(sub)
  return result > -1
}

// mySearch2(1, '1') // error 类型不一致

/* 5.可索引类型 */
interface StringArray {
  // 索引签名 "[]" 内表示 key 的名字和类型
  // 其中 index 可以所以命名
  [index: number]: string 
}

let myArray: StringArray = ['Bob', 'Fred'] // error
// let myArray: StringArray = [1, 2] // error 值的类型不匹配

// 共支持两种索引签名，字符串与数字，其中数字就是字符串的子类型
// 可以同时使用 数字和字符串，但是 数字 作为健时，必须是 字符串类型值的子类型
// (因为数字当索引时，就是转化为了字符串)
class Animal {
  name: string
}

class Dog extends Animal {
  breed: string
}

interface NotOkay {
  // 不能是字符串索引的父类型
  // [x: number]: Animal 
  // [x: string]: Dog
  [x: number]: Dog
  [x: string]: Animal
}

// 必须得初始化一个空对象
let myArray2: NotOkay = {}

myArray2[0] = {
  name: 'haha',
  breed: 'oo'
}

myArray2['0'] = {
  name: 'haha'
}

// 这面写后面的 0 会覆盖前面的 0，不管是字符串还是数字
// 上面这么写没什么意义，就是知道一个 字符串索引 的定义

// 有索引签名的接口，其他已定义的字段必须与索引签名一致
interface NumberDictionary {
  [index: string]: number
  length: number
  // name: string // error 与索引签名不一致
}

// 只读的索引类型
interface ReadonlyStringArray {
  readonly [index: number]: string
}

let myArray3:ReadonlyStringArray = ['1', '2']
// myArray3[0] = '3' // error 只读，不能赋值

/* 6.类类型的接口 */
interface ClockInterface {
  currentTime: Date
}

class Clock implements ClockInterface {
  currentTime: Date
  constructor (h: number, m: number) {

  }
}

// 接口中描述方法，类中实现
interface ClockInterface2 {
  currentTime: Date
  setTime(d: Date)
}

class Clock2 implements ClockInterface2 {
  currentTime: Date

  constructor (h: number, m: number) {

  }

  setTime (d: Date) {
    this.currentTime = d
  }
}

// 静态部分和实例部分
// interface ClockInterface3 {
//   new (hour: number, minute: number)
// }

// class Clock3 implements ClockInterface3 {
//   currentTime: Date

//   // ts 值检查实例部分，而constructor是静态部分，不做检查，所以显示没有
//   constructor (h: number, m: number) {

//   }
// }

// 正确使用方式
interface ClockConstructor {
  // new 的意思不是说，类继承后具有对应参数的 constructor 方法
  // 而是实现该接口的变量，必须能够被 new 而且参数必须相同
  new (hour: number, minute: number)
}

class Clock3 {
  constructor (h: number, m: number) {

  }
}

function createClock (ctor: ClockConstructor) {
  return new ctor(1, 2)
}

createClock(Clock3)

/* 7.继承接口 */
interface Shape {
  color: string
}

interface Square extends Shape {
  sideLength: number
}

let square: Square = {
  color: 'red',
  sideLength: 10
}

// 多个接口继承
interface Shape2 {
  color: string
}

interface PenStroke2 {
  penWidth: number
}

interface Square2 extends Shape2, PenStroke2 {
  sideLength: number
}

let square2 = <Square2>{}
square2.color = 'blue'
square2.sideLength = 10
square2.penWidth = 5.0

/* 8.混合类型 */
// 一个对象可以同时做为函数和对象使用
interface Counter {
  (start: number): string // 说明这个接口是方法接口
  interval: number
  reset(): void
}

function getCounter (): Counter {
  let counter = <Counter>function (start) {} // 这么定义方法
  counter.interval = 123
  counter.reset = function () {}
  return counter
}

let c2 = getCounter()
c2(10)
c2.reset()
c2.interval = 5.0

// 没什么用，官方：在使用JavaScript第三方库的时候，你可能需要像上面那样去完整地定义类型

/* 9.接口继承类 */
// 接口继承的类中拥有私有，那么只能是该类的子类实现该接口
class Control {
  private state: any // 私有变量
}

interface SelectableControl extends Control {
  select (): void
}

class Button extends Control implements SelectableControl {
  select () {}
}

class TextBox extends Control {
  select () {} // 可以自行定义额外变量
}

// error 缺少 state 属性，所以必须是 Control 的子类型
// class Image implements SelectableControl {
//   select () {}
// }