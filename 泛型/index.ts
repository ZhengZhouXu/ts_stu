/* 1.泛型 */
// demo1 任何值都返回其本身
// 如果使用 any，返回值为 any 类型，不易做类型判断
function identity (arg: any): any {
  return arg
}

// demo2 使用泛型
function identity2<T>(arg: T): T {
  return arg
}
let output = identity2<string>("123")
let output2 = identity2("321") // 类型推断，T 为string

/* 2.泛型变量 */
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}

/* 3.泛型类型 */
let myIdentity: <U>(arg: U) => U = identity // 泛型的名称不一定相同
let myIdentity2: {<T>(arg: T): T} = identity // 对象字面量的方式

// 泛型接口
interface GenericIdentityFn {
  <T>(arg: T): T
}

let myIdentity3: GenericIdentityFn = identity

// 将泛型作为接口的一个参数
interface GenericIdentityFn2 <T> {
  (arg: T): T
}

let myIdentity4: GenericIdentityFn2<number> = identity

/* 4.泛型类 */
class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function (x, y) {
  return x + y
}

/* 泛型约束 */
// 对泛型进行约束
interface Lengthwish {
  length: number
}

function loggingIdentity2<T extends Lengthwish>(arg: T): T {
  console.log(arg.length)
  return arg
}

// loggingIdentity2(3) // error 不符合要求
loggingIdentity2({length: 10, value: 3})

