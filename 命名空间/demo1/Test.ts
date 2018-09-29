/// <reference path="./Validation.ts">
/// <reference path="./LettersOnlyValidator.ts">
/// <reference path="./ZipCodeValidator.ts">

// 别名，与使用 var 不同的是，会单独创建引用，即你修改zip值不影响原来的值
import Zip = Validation.ZipCodeValidator 

let strings = ['Hello', '98052', '101']

let validators: {[s: string]: Validation.StringValidator}
validators['ZIP code'] = new Zip()
validators['Letters only'] = new Validation.LettersOnlyValidator()

for (let s of strings) {
  for (let name in validators) {
      console.log(`"${ s }" - ${ validators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
  }
}

// 所有引用打包为一个文件
// > tsc --outFile sample.js Test.ts
