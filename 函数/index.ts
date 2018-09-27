/* 函数类型 */
let myAdd: (baseValue: number, increment: number) => number = function (x: number, y: number): number {
  return x + y
}

/* 可选参数和默认参数 */
// 在ts中，所有参数都是必填参数（除非特殊指定）
function buildName (firstName: string, lastName: string) {
  return firstName + " " + lastName
}

// let result1 = buildName('Bob') // error 参数过少
// let result2 = buildName('Bob', 'Adams', 'Sr.') // error 参数过多
let result3 = buildName('Bob', 'Adams') 

// 可选参数 必须写在必填参数的后面
function buildName2 (firstName: string, lastName?: string) {
  if (lastName)
    return firstName + " " + lastName
  else
    return firstName
}

let result2_1 = buildName2('Bob')
// let result2_2 = buildName('Bob', 'Adams', 'Sr.') // error 同上参数过多
let result2_3 = buildName2('Bob', 'Adams') 

// 默认参数 当指定参数为 undefined 时（手动赋值 undefined 也算），会使用指定的默认值
function buildName3 (firstName: string, lastName: string = 'Smith') {
  return firstName + " " + lastName
}

let result3_1 = buildName3("Bob")
let result3_2 = buildName3("Bob", undefined) // 同上 Bob Smith
// let result3_3 = buildName3("Bob", "Adams", "Sr.") // error 同上参数过多
let result3_4 = buildName3("Bob", "Adams")

// 默认参数可以写在必填参数之前，通过手动赋值 undefined 的获取默认值
function buildName4 (firstName = "Will", lastName: string) {
  return firstName + ' ' + lastName
}

// let result4_1 = buildName("Bob");                  // error, 参数过少
// let result4_2 = buildName("Bob", "Adams", "Sr.");  // error, 参数过多
let result4_3 = buildName4("Bob", "Adams");         
let result4_4 = buildName4(undefined, "Adams");  

// 剩余参数
function buildName5(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName5("Joseph", "Samuel", "Lucas", "MacKinzie")

/* this */
// demo1
// let deck = {
//   suits: ['hearts', 'spades', 'clubs', 'diamonds'],
//   cards: Array(52),
//   createCardPicker: function () {
//     return () => {
//       let pickedCard = Math.floor(Math.random() * 52)
//       let pickedSuit = Math.floor(pickedCard / 13)

//       return {suit: this.suits[pickedSuit], card: pickedCard % 13}
//     }
//   }
// }

// let cardPicker = deck.createCardPicker()
// let pickedCard = cardPicker()
// pickedCard.suit // 此时suit显示的时any类型

// demo2 指定this类型
interface Card {
  suit: string,
  card: number
} 

interface Deck {
  suits: string[]
  cards: number[]
  createCardPicker(this:Deck): () => Card // 返回值是一个方法
}

let deck: Deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function(this: Deck) { // 指定this类型
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return {suit: this.suits[pickedSuit], card: pickedCard % 13};
    }
  }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();
pickedCard.suit // 类型为 string

/* 重载 */
let suits = ['hearts', 'spades', 'clubs', 'diamonds']

function PickedCard (x: {suit: string, card: number}[]): number // 重载1
function PickedCard (x: number): {suit: string, card: number}  // 重载2
// 会对传入的值和返回的值进行检测，必须符合以上两个重载
function PickedCard (x): any {
  if (typeof x === "object") {
    let pickedCard = Math.floor(Math.random() * x.length)
    return pickedCard
  } else if (typeof x == 'number') {
    let pickedSuit = Math.floor(x / 13)
    return { suit: suits[pickedSuit], card: x % 13 }
  }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }]
let pickedCard1 = myDeck[PickedCard(myDeck)]
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit)

let pickedCard2 = PickedCard(15)
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit)