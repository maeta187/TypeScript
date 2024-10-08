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
  constructor(
    public name: string,
    public age: number
  ) {}
}

type ConstructorParametersPersonType = ConstructorParameters<typeof Person>

const constructorParametersPersonType: ConstructorParametersPersonType = [
  'Quill',
  38
]

/**
 * ReturnType<Type>
 * 関数の戻り値の型を返す
 * サードパーティのライブラリの型を取得する時などに使える
 */

type SetTimeOutReturnType = ReturnType<typeof setTimeout>

const timer: SetTimeOutReturnType = setTimeout(() => {
  console.log('foo')
}, 3000)

/**
 * InstanceType<Type>
 * Classのインスタンスの型を返す
 * 自分の実装したClassであれば「type PersonInstanceType = Person」でも同じことができる
 * なので普段使いする型ではない
 * クラス定義にアクセスできない場合・不明(ジェネリクスを使う)な場合などがある
 * 参考: https://zenn.dev/ytr0903/articles/905306671f39c8
 */

type PersonInstanceType = InstanceType<typeof Person>

const personInstance: PersonInstanceType = new Person('Quill', 38)

/**
 * ThisParameterType<Type>
 * 指定した関数のthisの型を返す
 * Classのメソッドの型を取得する時などに使える
 * アロー関数はthisを持たないので使えない
 * また、参照している関数にthisがない場合はunknown型を返す
 */

function toCastString() {
  return this.toString()
}

function numberToString(n: ThisParameterType<typeof toCastString>) {
  return toCastString.apply(n)
}

/**
 * OmitThisParameter<Type>
 * 指定した関数の引数に存在するthisを削除する
 * this以外の引数はそのまま残る
 */

function displayProfile(arg: boolean) {
  console.log(this.name)
  console.log(this.age)
  console.log(arg)
}

type OmitThisParameterType = OmitThisParameter<typeof displayProfile>

const omitThisParameterFunction: OmitThisParameterType = function (arg) {
  displayProfile.call(
    {
      name: 'Quill',
      age: 38
    },
    arg
  )
}
omitThisParameterFunction(true)

/**
 * ThisType<T>
 * thisの型を指定する
 * 指定された型をthisから参照できるようになる
 * */

interface Greetings {
  hello(): void
}

const user: Greetings & ThisType<Developer> = {
  hello() {
    console.log(this.name)
    console.log(this.age)
    console.log(this.experience)
  }
}

user.hello.bind({
  name: 'Quill',
  age: 38,
  experience: 3
})()

/**
 * Awaited<Type>
 * Promiseの戻り値の型を返す
 * Promiseの戻り値の型を取得する時などに使える
 * ただし、TypeがPromiseでない場合はTypeをそのまま返す
 * Union型の場合は片方がPromise、もう片方がtypeの場合はでも両方ともTypeを返す
 * なので、TypeがPromiseであることを確認してから使う
 * 参考: https://zenn.dev/okunokentaro/articles/01gm397f4bvdzkhskwh2q6dyf2
 * */

type AwaitedType = Awaited<Promise<string>>

type AwaitedUnionType = Awaited<boolean | Promise<number>>

/**
 * 第2引数の「D」は第1引数の「C」を参照して型定義される
 * 第１引数はstring[]なので第１引数の配列の要素のいずれかか、undefinedが使用できる
 */
// const createStreetLight = <C extends string, D extends C>(
//   colors: C[],
//   defaultColor?: D
// ) => {
//   console.log(colors)
//   console.log(defaultColor)
// }

/**
 * NoInfer<T>
 * 第2引数の型定義で「NoInfer」を使用すると上記と同様の型定義が行える
 * また、上記と違い関数を読んでいる部分で型推論を行うと第2引数で使用できる引数が分かる
 */
const createStreetLight = <C extends string>(
  colors: C[],
  defaultColor?: NoInfer<C>
) => {
  console.log(colors)
  console.log(defaultColor)
}

createStreetLight(['red', 'yellow', 'green'], 'green')
