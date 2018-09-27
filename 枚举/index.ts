/* 1.异构枚举 */
// 枚举可以混合字符串和数字的值
// 虽然可以这么写，但是不推荐
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = 'YES'
}

// 枚举的值可以是一个可计算出的表达式
enum FileAccess {
  // constant members
  None,
  Read    = 1 << 1,
  Write   = 1 << 2,
  ReadWrite  = Read | Write,
  // computed member
  G = "123".length
}

/* 反向映射 */
// 通过值，返回枚举名称（只限于数字作为值得枚举成员）
enum Enum {
  A
}

let a = Enum.A
let nameOfA = Enum[a] // "A"

/* 外部枚举 */
// 只在书写时存在，编译后删除
declare enum Directions {
  Up,
  Down,
  Left,
  Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
// 编译后 ==> let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]

/* 常数枚举 */
// 编译后会去除枚举声明，用具体的值代替，常量枚举不允许包含计算成员
const enum Directions2 {
  Up,
  Down,
  Left,
  Right
}

let directions2 = [Directions2.Up, Directions2.Down, Directions2.Left, Directions2.Right]
// 编译后 ==> let directions = [0, 1, 2, 3]