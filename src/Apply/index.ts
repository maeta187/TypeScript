// インターセクション型
interface Engineer {
  name: string
  role: string
}

interface Blogger {
  name: string
  follower: number
}

type EngineerBlogger = Engineer & Blogger
// interfaceで書いた場合
// interface EngineerBlogger extends Engineer, Blogger {}

const quill: EngineerBlogger = {
  name: 'Quill',
  role: 'front-end',
  follower: 1000
}

type NumberBoolean = number | boolean
type StringNumber = string | number

/**
 * NumberBooleanとStringNumber内で重複している型が定義される
 * 重複が無ければnever型となり、複数の重複があるとユニオン型になる
 */
// type Mix = NumberBoolean & StringNumber

function toUpperCase(x: string): string
function toUpperCase(x: number): number
function toUpperCase(x: string | number) {
  /**
   * タイプガード
   * typeof演算子
   */
  if (typeof x === 'string') {
    return x.toUpperCase()
  }
  return x
}

/**
 * 関数オーバーロード
 * toUpperCase()の引数がstring型とnumber型のユニオン型かつreturnもxをそのまま返すパターンがあるので型推論もユニオン型となる
 * 型アサーションを使う方法もあるが使い回す時に都度書く必要がある
 * 実行している関数の上に定義し直した関数を書くと、関数のオーバーロードがされる
 * その場合、実際に動く関数の型は認識されなくなる
 * 関数を変数に代入した時は型推論でオーバーロードで書かれた型をすべて持ったinterfaceが表示される
 */

const upperHello = toUpperCase

/**
 * 関数オーバーロードの型定義
 * 関数オーバーロードの型定義を行う際はオーバーロードされる型をすべて書く必要がある。
 */
interface FuncA {
  (a: string, b: string): number
  (a: string, b: number): number
}

interface FuncB {
  (a: string): number
}

/**
 * インターセクションを使用した場合はすべての型が含まれるようになり、左側から優先的型定義される
 */

const intersectionFunc: FuncA & FuncB = function (
  a: number | string,
  b?: number | string
) {
  return 0
}

/**
 * ユニオン型にした場合、パラメーターはインターセクション型になり返り値はユニオン型となる
 */

const unionFunc: FuncA | FuncB = function (
  a: number | string,
  b?: number | string
) {
  return 0
}

/**
 * in演算子
 */
type NomadWorker = Engineer | Blogger

const worker = {
  name: 'Quill',
  role: 'front-end'
}

function describeProfile(nomadWorker: NomadWorker) {
  console.log(nomadWorker.name)
  if ('role' in nomadWorker) {
    // この処理に入った時にnomadWorkerの型はEngineerとなる
    console.log(nomadWorker.role)
  }
  if ('follower' in nomadWorker) {
    // この処理に入った時にnomadWorkerの型はBloggerとなる
    console.log(nomadWorker.follower)
  }
}

class Dog {
  // タグ付きUnion
  kind = 'dog' as const
  speak() {
    console.log('bow-wow')
  }
}

class Bird {
  // タグ付きUnion
  kind = 'bird' as const
  speak() {
    console.log('tweet-tweet')
  }
  fly() {
    console.log('flutter')
  }
}

/**
 * instanceof演算子
 * instanceofを使用する場合はnewで作られたClassのインスタンスである必要がある
 */
type Pet = Dog | Bird
function havePet(pet: Pet) {
  pet.speak()
  switch (pet.kind) {
    case 'bird':
      pet.fly()
  }
  if (pet instanceof Bird) {
    pet.fly()
  }
}
/**
 * 型アサーション
 * 元々持っている型に対して明示的に指定し、指定した型することができる
 * 「<>」を使う方法と「as」を使用した方法がある
 * JSX内で書く場合は「<>」がHTML要素として処理される場合があるので気をつける
 */
// const input = <HTMLInputElement>document.getElementById('input')
// const input = document.getElementById('input') as HTMLInputElement
// input.value = 'initial input value'
;(document.getElementById('input') as HTMLInputElement).value =
  'initial input value'

// Non-null assertion operator
// const input = document.getElementById('input')!
// input.value = 'initial input value'

/**
 * インデックスシグネチャ
 * 型定義されたオブジェクトは後から追加は行えないが、インデックスシグネチャを使用するで型定義されていない要素を追加することができる
 * 追加する際は、インデックスシグネチャで定義された型である必要がある
 * ただし、keyをstring型にし場合でもnumber型が書ける(number型の場合はstring型は書けない)
 * インデックスシグネチャを使用した場合、オブジェクト内の要素を参照する際、存在しない要素を書いてもエラーと認識されなくなるので注意が必要
 */
interface Designer {
  name: string
  [index: string]: string
}

const designer: Designer = {
  name: 'Quill',
  role: 'foo'
}

/**
 * オプショナルチェイン
 * 対象のkeyが存在しない場合がある時に使用する
 * 存在しない場合はundefinedとなる
 * downloadedData.user?.name
 */
interface DownloadedData {
  id: number
  user?: {
    name?: {
      fist: string
      last: string
    }
  }
}

const downloadedData: DownloadedData = {
  id: 1
}

/**
 * Nullish Coalescing
 * 「??」を使用することで対象の値がfalseの時に代入する値を設定する
 * OR演算子などでも代用できるが、OR演算子の場合は空文字や0でもfalseになる
 * Nullish Coalescingを使用することで空文字や0の場合でも対象の値がtrueになる（undefinedとnullのみがfalseとなる）
 */
const userData = downloadedData.user ?? 'no-user'

/**
 * LookUp型
 * オブジェクト型から一部の型を参照して、型定義する
 */
type id = DownloadedData['id']
type foo = DownloadedData['id' | 'user']
// type name = DownloadedData['user']['name']

/**
 * 型の互換性
 * enum型とNumber型には互換性がある
 * 関数は元の関数の引数より上書きする側の引数が多くなるとエラーとなる
 * Classの場合は同じプロパティが存在する場合は問題ないが代入側のプロパティがprivateの場合はエラーとなる
 */
// enum Color {
//   RED,
//   BLUE
// }
// let target = 0
// const source = Color.RED
// let target = function (a: string, b: string) {
//   return
// }
// const source = function (a: string) {
//   return
// }
// target('hi', 'hello')
// class AdvancedPerson {
//   name = 'Perter'
//   age = 30
// }
// class AdvancedCar {
//   name = 'Prius'
//   age = 7
// }

// let target = new AdvancedPerson()
// const source = new AdvancedCar()
// target = source

/**
 * レストパラメーター
 * 型配列でもできるがタプルでも指定できる
 * タプルで指定した場合は書いた順番に型を一致させる必要がある
 * タプルのみスプレッド構文が使用できる
 * オプショナルパラメーターも使用できる
 * 配列とタプルにreadonlyをつけることができる
 */

function advancedFn(...args: readonly [number, string, boolean, ...number[]]) {
  console.log({ args })
  return
}

/**
 * constアサーション
 * as constをつけることで書き換え不可能な値となる
 * 配列やオブジェクトにつけた場合は追加もできない
 */

const milk = 'milk' as const
// let drink = milk
const array = [10, 20] as const
const peter = {
  name: 'Peter',
  age: 30
} as const

/**
 * 型の中でtypeofを使用する
 * 型を作る時にtypeofの後に値を使用するとその値の型を取得する
 */

type PeterType = typeof peter

export const checkApply = () => {
  console.log(quill)
  console.log(toUpperCase('quill'))
  describeProfile(worker)
  havePet(new Bird())
  console.log(designer)
  console.log(upperHello)
  console.log(downloadedData.user?.name)
  console.log(intersectionFunc(''))
  console.log(unionFunc('', 0))
  advancedFn(1, 'hi', true, 1, 1, 1, 1)
  console.log(milk)
  console.log({ array })
  console.log({ peter })
}
