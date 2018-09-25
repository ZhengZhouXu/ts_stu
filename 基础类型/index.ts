/* 1.布尔值 */
let isDone: boolean = false

/* 2.数值 */
let decLiteral: number = 6 // 十进制
let hexLiteral: number = 0xf00d // 十六进制
let binaryLiteral: number = 0b1010 // 二进制
let octalLiteral: number = 0o744 // 八进制

/* 3.字符串 */
// 在 TS 自带的类型声明里面，已经声明了全局变量 declare const name:naver
// 即 window.name。所以，如果你再在全局作用域中声明 name 的话，就属于重复声明了。
// let name: string = 'Bob'
let myName: string = 'Bob'
let myName2: string = `Bob2` // 也可以使用模板字符串

/* 4.数组 */
let list: number[] = [1, 2, 3]
let list2: Array<number> = [1, 2, 3]
// 只读数组
let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a
// ro[0] = 12 // error
// ro.push(5) // error
// ro.length = 100 // error
// a = ro // error 不能将 ReadonlyArray 赋值给一个数组
a = ro as number[] // 可以使用断言

/* 5.元组 Tuple 表示一个已知 "元素数量和类型" 的数组 */
let x: [string, number]
x = ['hello', 10] // ok
// x = [10, 'hello'] error 顺序不一致
// 元组越界时会使用联合类型代替
x[2] = 11 // 联合类型 (string | number)
x[2] = 'world'

/* 6.枚举 enum （ts特殊语法） */
enum Color {
  Red,
  Green,
  Blue
}

let c: Color = Color.Red

// 默认从 0 开始编码，可以手动赋值
enum Color2 {
  Red = 1,
  Green, // 自动编码 2
  Blue // 自动编码 3
}

// 还可以手动赋值
enum Color3 {
  Red = 1,
  Green = 3, 
  Blue = 4
}

let colorName: string = Color3[3] // 可以通过索引获取 key 名

/* 7.Any 任何类型 */
let notAny = 'I want any'
// notAny = 1 // error 不申明类型 ts 会在第一次赋值时自动检测，不能再赋值其他类型

let isAny: any = 'I want any'
isAny = 1

// any 类型在编译时不进行类型检查
let notSure: any = 4
notSure.isItExists() // 不会检测是否有该方法，即使没有也不会报错

let prettySure: Object = 4 // 对比 Object
// error 虽然可以任意赋值，但是会对类型进行检测，
// 而且即使是存在属性，由于是 Object 类型，也会报错 
// prettySure.toFixed() 

/* 8.void 表示 null 或 undefined 一般用于方法返回值，用于变量没有多大作用 */
let unusable: void = undefined
unusable = null

function voidFunc (): void {
  // return undefined
  // return null
}

/* 9.Null 和 Undefined */
// 没多大用
let u: undefined = undefined
let n: null = null
// 默认情况下 null 和 undefined 是所有类型的子类型, 
// 就是说可以把 null 和 undefined 赋值给 number 类型的变量
// 当指定了--strictNullChecks标记(推荐使用)，null和undefined只能赋值给void和它们各自
// 此时，想对一个变量复制 null 或 undefined 时，可以使用联合类型
let canNull: string | null = 'string'
canNull = null

/* 10.never */
// 表示永远不会有返回值，例如报错，或者无限循环
function error (): never {
  throw new Error('报错')
}

function infiniteLoop (): never {
  while (true) {

  }
}

/* 11.类型断言 */
// 相当于类型转换
// 写法1
let someValue1 = 'this is a string'
let someLength1 = (<string>someValue1).length

// 写法2 在jsx中只能用该语法
let someValue2 = 'this is a string'
let someLength2 = (someValue2 as string).length



