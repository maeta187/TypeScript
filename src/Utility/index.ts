interface Todo {
  title: string
  text: string
}

/**
 * Partial<T>
 * 引数で渡された型をすべてオプショナルプロパティにする
 */
type TodoPartial = Partial<Todo>

/**
 * Readonly<T>
 * 引数で渡された型をすべてReadonlyにする
 */
type ReadTodo = Readonly<Todo>

/**
 * Required<T>
 * 引数で渡された型をすべてRequiredにする
 * 仮に渡された型がオプショナルプロパティであってもRequiredになる
 */
type RequiredTodo = Required<TodoPartial>

/**
 * Record<Keys, Type>
 * オブジェクトのkeyとプロパティの値のTypeの型を作る
 */
type StringNumber = Record<string, number>

/**
 * keyの指定をリテラル型を使って作ることもできる
 * keyはname、age、experienceとなり、valueの方はstringとnumberのユニオン型
 */
type Developer = Record<'name' | 'age' | 'experience', string | number>

const developer: Developer = {
  name: 'Quill',
  age: 30,
  experience: 5
}

/**
 * Pick<T, Keys>
 * 引き渡された型(T)から指定したキーだけを含むオブジェクト型を返す
 */
type EngineerBlogger = {
  name: string
  role: string
  follower: number
}

type Engineer = Pick<EngineerBlogger, 'name' | 'role'>

const engineer: Engineer = {
  name: 'Quill',
  role: 'front-end'
}

/**
 * Omit<T, Keys>
 * 引き渡された型(T)から指定したキーを取り除いたオブジェクト型を返す
 */
type Blogger = Omit<EngineerBlogger, 'role'>

const blogger: Blogger = {
  name: 'Quill',
  follower: 1000
}

/**
 * Exclude<T, U>
 * 引き渡されたユニオン型(T)から指定したキー{U}を取り除いた型を返す
 * 引き渡された型に存在しないキーやタイポ気を付ける
 * 引き渡されている型に変更が入った時は影響を受ける
 */
type ButtonVariant = 'primary' | 'secondary' | 'danger'
type PrimaryButtonType = Exclude<ButtonVariant, 'secondary' | 'danger'>

/**
 * Extract<T, U>
 * 引き渡されたユニオン型(T)から指定したキー{U}を抽出した型を返す
 */
type noDangerButtonType = Extract<ButtonVariant, 'primary' | 'secondary'>

/**
 * NonNullable<T>
 * 引き渡された型からnullとundefinedを除外した型を返す
 */

type NullableType = string | null | undefined

type NonNullableType = NonNullable<NullableType>

/**
 * Parameters<T>
 * 関数の引数からタプル型を作る
 * 通常の型定義とは違い。関数の引数の型統一できる
 */
const parametersFunction = (foo: number, bar: string, fizz?: boolean) => {
  console.log({ foo })
  console.log({ bar })
  console.log({ fizz })
}

type plusOneType = Parameters<typeof parametersFunction>

const parametersFunctionArgs: plusOneType = [100, 'Quill', true]

parametersFunction(...parametersFunctionArgs)

/**
 * ConstructorParameters<Type>
 * Classのコンストラクタの引数からタプル型または、Array型を作る
 */
class Person {
  constructor(public name: string, public age: number) {}
}

type ConstructorParametersPersonType = ConstructorParameters<typeof Person>

const constructorParametersPersonType: ConstructorParametersPersonType = [
  'Quill',
  38
]
