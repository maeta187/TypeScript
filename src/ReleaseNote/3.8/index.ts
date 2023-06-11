/**
 * import type { Person } from './module'
 * クラスなどでimport typeを使うと、その型は型としてのみimportされる
 * 値として使用した場合hはエラーになる
 */
import { Person } from './module'

class Foo extends Person {
  /**
   * JavaScriptで追加されたのはprivateフィールド
   * #をつけることでprivateフィールドになる
   */
  #entry: 30
  static species = 'Homo sapiens'
  static isAdult(age: number) {
    if (age > 17) return true
    return false
  }
  readonly id: number = 32
  constructor(readonly name: string, protected age: number) {
    super(name, age)
  }
  greeting(this: Foo) {
    console.log(`Hello! My name is ${this.name}. I am ${this.age} years old.`)
  }
  incrementAge() {
    this.age++
  }
  checkEntry() {
    console.log(this.#entry)
  }
}

const foo = new Foo('foo', 22)
foo.greeting()
foo.checkEntry()

/**
 * TSの場合、構造的部分型を採用してるけど、プライベートフィールドを含む以下のようなケースはエラーになる
 */
class Square {
  #sideLength: number

  constructor(sideLength: number) {
    this.#sideLength = sideLength
  }

  equals(other) {
    return this.#sideLength === other.#sideLength
  }
}

const a = new Square(100)
const b = { sideLength: 100 }
// Boom!
// TypeError: attempted to get private field on non-instance
// This fails because 'b' is not an instance of 'Square'.
console.log(a.equals(b))

/**
 * export * as ns 構文
 * 別モジュールのすべてのメンバーを全てエクスポートする場合、１度エクスポートする必要あった
 */
// import * as Person from './module'
// export { Person } from './module'
/**
 * それが1行で書けるようになった
 */
// export * as Person from './module'

/**
 * トップレベル await
 * awaitはasync関数内でしか使えなかったが、トップレベルで使えるようになった
 * コンパイいるオプションのtargetをES2017以上にする必要がある
 */
