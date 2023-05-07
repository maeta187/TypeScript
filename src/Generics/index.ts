/**
 * ジェネリクス型を使用することで実行時に型も引数として渡せる
 * T(Type)
 * extendsを使用することで型パラーメーターに制限をつけることが可能
 *
 * @param {T} value
 * @returns {T}
 */
function copy<T extends { name: string }>(value: T): T {
  return value
}

/**
 * keyof演算子
 * オブジェクトのkeyを型にする
 */
// type K = keyof { name: string; age: number }

function copyKey<T extends { name: string }, U extends keyof T>(
  value: T,
  key: U
): T {
  console.log(value[key])
  return value
}

/**
 * ジェネリクス型ではなく、ユニオン型にすると柔軟過ぎて型の安全性が保てなくなる
 */
class LightDatabase<T extends string | number | boolean> {
  private data: T[] = []
  add(item: T) {
    this.data.push(item)
  }
  remove(item: T) {
    this.data.splice(this.data.indexOf(item), 1)
  }
  get() {
    return this.data
  }
}

const stringLightDatabase = new LightDatabase<string>()
stringLightDatabase.add('Apple')
stringLightDatabase.add('Banana')
stringLightDatabase.add('Grape')
stringLightDatabase.remove('Apple')
const data = stringLightDatabase.get()

interface TmpDatabase<T> {
  id: number
  data: T[]
}

const tmpDatabase: TmpDatabase<number> = {
  id: 4,
  data: [3]
}

/**
 * Promiseはジェネリクス型であり、型を指定しない場合はunknownを渡している
 * 明示的に型を指定することもできる
 * @param {any} resolve
 */
const fetchData: Promise<string> = new Promise((resolve) => {
  setTimeout(() => {
    resolve('hello')
  }, 3000)
})

fetchData.then((data) => {
  console.log(data.toLocaleUpperCase())
})

/**
 * Arrayで型定義した場合、ジェネリクス型なので引数を設定する必要がある
 */
const vegetables: Array<string> = ['Tomato', 'Broccoli', 'Asparagus']

/**
 * イコールを使用することでデフォルトの型定義を行うことができる
 */
interface ResponseData<T extends { message: string } = never> {
  data: T
  status: number
}

let tmp2: ResponseData

interface Vegetables {
  tomato: string
  pumpkin: string
}

/**
 * MappedType
 * ユニオン型のように書くか、keyofを使用して反復処理を行うことができる
 * readonlyやエクスクラメーションにマイナスを付けるとそれぞれの機能を外すことができる
 */
type MappedType = {
  readonly [K in keyof Vegetables]?: string
  // [P in 'tomato' | 'pumpkin']: string
}

/**
 * ConditionalTypes
 * tomatoがstring型に代入できる時はnumber、代入できない時はbooleanとなる
 */
type ConditionalTypes = 'tomato' extends string ? number : boolean

/**
 * infer
 * inferはanyと同様でなんでも許容する
 * 継承させている値に最も近い形で型推論される
 */
type ConditionalTypesInfer = { tomato: 'tomato' } extends { tomato: infer R }
  ? R
  : boolean

/**
 * DistributiveConditional
 * 継承している型とそれぞれ検証を行って型定義をする
 */
type DistributiveConditionalTypes<T> = T extends 'tomato' ? number : boolean

let tmp3: DistributiveConditionalTypes<'tomato' | 'pumpkin'>

export const checkGenerics = () => {
  console.log(copy({ name: 'Quill' }))
  console.log(copyKey({ name: 'Quill', age: 30 }, 'name'))
  console.log(data)
  console.log(tmpDatabase)
  fetchData
  console.log(vegetables)
}
