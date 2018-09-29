let numberRegexp = /^[0-9]+$/
class ZipCodeValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s)
    }
}
export = ZipCodeValidator // 相当于 exports = ZipCodeValidator