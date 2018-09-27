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
